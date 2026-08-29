import { PrismaClient, Prisma } from '@prisma/client';

/**
 * Enhanced Database URL Optimizer.
 * Injects connection pooling, pgbouncer flags & keepalive parameters.
 */
function getOptimizedDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    
    // Auto-detect Supabase / PgBouncer pooler (usually port 6543)
    if (parsed.port === '6543' || url.includes('pooler.supabase.com')) {
      if (!parsed.searchParams.has('pgbouncer')) {
        parsed.searchParams.set('pgbouncer', 'true');
      }
      if (!parsed.searchParams.has('statement_cache_size')) {
        parsed.searchParams.set('statement_cache_size', '0');
      }
    }

    if (!parsed.searchParams.has('connection_limit')) {
      // In development, keep a lean pool to avoid idle connection drops
      const limit = process.env.NODE_ENV === 'production' ? '10' : '5';
      parsed.searchParams.set('connection_limit', limit);
    }
    if (!parsed.searchParams.has('pool_timeout')) {
      parsed.searchParams.set('pool_timeout', '20');
    }
    if (!parsed.searchParams.has('connect_timeout')) {
      parsed.searchParams.set('connect_timeout', '15');
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

const globalForPrisma = globalThis as unknown as {
  prismaBase: PrismaClient | undefined;
};

const optimizedUrl = getOptimizedDatabaseUrl();

const basePrisma =
  globalForPrisma.prismaBase ??
  new PrismaClient({
    datasourceUrl: optimizedUrl,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaBase = basePrisma;

/**
 * Executes a Prisma database operation with automatic reconnect & retry
 * if a "Closed" connection, OS error 10054 (ConnectionReset), or transient network error occurs.
 */
export async function withPrismaRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await operation();
    } catch (error: any) {
      attempt++;
      const msg = String(error?.message || error?.stack || error || "");
      const isClosedOrResetError =
        msg.includes("Closed") ||
        msg.includes("connection closed") ||
        msg.includes("PostgreSQL connection: Error") ||
        msg.includes("kind: Closed") ||
        msg.includes("10054") ||
        msg.includes("ConnectionReset") ||
        msg.includes("ECONNRESET") ||
        msg.includes("ETIMEDOUT") ||
        msg.includes("forcibly closed") ||
        msg.includes("Broken pipe") ||
        msg.includes("Connection refused") ||
        msg.includes("EngineClosed") ||
        msg.includes("Io") ||
        error?.code === "P1001" ||
        error?.code === "P1017";

      if (isClosedOrResetError && attempt < maxRetries) {
        const backoffMs = Math.min(150 * Math.pow(2, attempt), 1000);
        console.warn(`[Prisma Connection Resilience] Connection reset/closed detected (code: 10054/closed/idle). Auto-reconnecting in ${backoffMs}ms (Attempt ${attempt}/${maxRetries})...`);
        try {
          await basePrisma.$disconnect().catch(() => {});
          await new Promise((r) => setTimeout(r, backoffMs));
          await basePrisma.$connect().catch(() => {});
        } catch (reconnectErr) {
          console.error("[Prisma Reconnect Error]:", reconnectErr);
        }
      } else {
        throw error;
      }
    }
  }
  throw new Error("Failed to execute database query after retries.");
}

/**
 * Universal Auto-Healing Extended Prisma Client.
 * Automatically wraps all model queries with retry and connection resilience.
 */
export const prisma = basePrisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        return withPrismaRetry(() => query(args));
      },
    },
  },
}) as unknown as PrismaClient;

/**
 * Checks if the database is reachable by running a simple query.
 * Useful for health checks and API grace diagnostics.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await withPrismaRetry(async () => {
      await (basePrisma as any).$queryRaw`SELECT 1`;
    });
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}

/**
 * Safe Non-Blocking DB Operation Isolation Helper.
 * Wraps background DB operations (logging, caching, history) so any DB connection error
 * NEVER breaks or crashes the caller API response.
 */
export async function safeDbExecute<T>(
  operation: () => Promise<T>,
  fallbackMsg = "DB Operation"
): Promise<T | null> {
  try {
    return await withPrismaRetry(operation);
  } catch (error: any) {
    console.warn(`[Safe DB Isolation] Non-critical ${fallbackMsg} notice:`, error?.message || error);
    return null;
  }
}

/**
 * Standardized database error handler to prevent stack traces leaking to clients.
 */
export function handlePrismaError(error: unknown): { error: string; status: number } {
  console.error("Database error occurred:", error);

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      error: "Hệ thống cơ sở dữ liệu hiện không khả dụng. Vui lòng quay lại sau.",
      status: 503, // Service Unavailable
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return {
        error: "Dữ liệu đã tồn tại trong hệ thống.",
        status: 409, // Conflict
      };
    }
    return {
      error: `Lỗi yêu cầu cơ sở dữ liệu: ${error.code}`,
      status: 400,
    };
  }

  const message = error instanceof Error ? error.message : "Internal server error";
  return {
    error: message,
    status: 500,
  };
}

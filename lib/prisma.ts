import { PrismaClient, Prisma } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Checks if the database is reachable by running a simple query.
 * Useful for health checks and API grace diagnostics.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Run a fast, lightweight query to ping the database
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}

/**
 * Executes a Prisma database operation with automatic reconnect & retry
 * if a "Closed" connection or network error occurs.
 */
export async function withPrismaRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 2
): Promise<T> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await operation();
    } catch (error: any) {
      attempt++;
      const isClosedError =
        error?.message?.includes("Closed") ||
        error?.message?.includes("connection closed") ||
        error?.code === "P1001" ||
        error?.code === "P1017";

      if (isClosedError && attempt < maxRetries) {
        console.warn(`[Prisma Connection Resilience] Connection closed. Reconnecting (Attempt ${attempt}/${maxRetries})...`);
        try {
          await prisma.$disconnect();
          await prisma.$connect();
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
    // Specific Prisma known error codes (like P2002 for unique constraint violations)
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


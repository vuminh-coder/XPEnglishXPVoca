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

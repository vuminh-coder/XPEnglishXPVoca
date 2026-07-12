import { NextResponse } from 'next/server';
import { prisma, handlePrismaError } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const vocab = await prisma.vocabulary.findUnique({
      where: { id },
    });

    if (!vocab) {
      return NextResponse.json({ error: "Không tìm thấy từ vựng" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: vocab });
  } catch (error: unknown) {
    const { error: errorMsg, status } = handlePrismaError(error);
    return NextResponse.json({ error: errorMsg }, { status });
  }
}
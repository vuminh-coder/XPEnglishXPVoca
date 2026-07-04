import { getAuthenticatedUserId } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Toggle like
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    let liked = false;
    if (existingLike) {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      liked = false;
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      liked = true;
    }

    // Count new likes
    const likesCount = await prisma.like.count({
      where: { postId },
    });

    return NextResponse.json({ success: true, data: { liked, likesCount } });
  } catch (error: any) {
    console.error("POST /api/posts/[id]/like error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

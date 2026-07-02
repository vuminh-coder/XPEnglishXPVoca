import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content: content.trim(),
      },
      include: {
        user: true,
      },
    });

    const formattedComment = {
      id: comment.id,
      author: comment.user.username || "user",
      avatarEmoji: comment.user.avatarEmoji || "👤",
      content: comment.content,
    };

    return NextResponse.json({ success: true, data: formattedComment });
  } catch (error: any) {
    console.error("POST /api/posts/[id]/comment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

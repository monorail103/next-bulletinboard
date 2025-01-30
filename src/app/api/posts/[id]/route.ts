// 特定のスレッドの書き込みをすべて取得する
// GET /api/posts/[id]
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                ThreadId: new URL(req.url).searchParams.get('id') as string
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return NextResponse.json(posts);
    }
    catch (e) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}
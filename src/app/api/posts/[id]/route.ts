// 特定のスレッドの書き込みをすべて取得する
// GET /api/posts/[id]
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    try {

        if (!id) {
            return NextResponse.json(
            { error: "IDが指定されていません" },
            { status: 400 }
            );
        }

        if (!id) {
            return NextResponse.json({ error: "Missing thread ID" }, { status: 400 });
        }

        const posts = await prisma.post.findMany({
            where: {
                ThreadId: id
            },
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                content: true,
                username: true,
                createdAt: true
            }
        });

        return NextResponse.json(posts);
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
};

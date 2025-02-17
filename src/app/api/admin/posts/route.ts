// すべての書き込みをIP込みで取得する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {


    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'asc'
            },
        });

        return NextResponse.json(posts);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
};

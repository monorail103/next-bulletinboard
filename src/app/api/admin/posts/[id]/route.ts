// 投稿を削除する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }>}) => {
    const id = (await params).id;

    try {
        await prisma.post.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({ message: "Post deleted" });
    }
    catch (e) {
        return NextResponse.json({error: e}, { status: 500 });
    }
}
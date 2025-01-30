// スレッドのいいね数を+1する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    try {
        const thread = await prisma.thread.update({
            where: {
                id: id
            },
            data: {
                good: {
                    increment: 1
                }
            }
        });
        return NextResponse.json(thread);
    }
    catch (e) {
        return NextResponse.json({ error: "Failed to like thread" }, { status: 500 });
    }
}
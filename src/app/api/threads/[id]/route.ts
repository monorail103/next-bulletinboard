// スレッドのいいね数を+1する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

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
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
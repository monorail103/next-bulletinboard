// 書き込みを含めて、スレッドを削除
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    try {
        // スレッドを削除
        await prisma.thread.delete({
            where: {
                id: id
            }
        });
        // スレッドに関連する投稿も削除
        await prisma.post.deleteMany({
            where: {
                ThreadId: id
            }
        });
        return NextResponse.json({ message: "Thread deleted" });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
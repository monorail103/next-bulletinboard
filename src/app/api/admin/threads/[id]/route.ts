// 書き込みを含めて、スレッドを削除
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    try {
        await prisma.thread.delete({
            where: {
                id: id
            }
        });
        await prisma.post.deleteMany({
            where: {
                ThreadId: id
            }
        });
        return NextResponse.json({ message: "Thread deleted" });
    }
    catch (e) {
        return NextResponse.json({ error: "Failed to delete thread" }, { status: 500 });
    }
}
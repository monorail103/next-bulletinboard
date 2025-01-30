// スレッドをすべて取得する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const threads = await prisma.thread.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(threads);
    }
    catch (e) {
        return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 });
    }
}
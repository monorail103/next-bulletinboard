// スレッドをすべて取得する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Thread } from "@prisma/client";
import { Server } from "socket.io";

export const GET = async (req: NextRequest) => {
    try {
        const threads: Thread[] = await prisma.thread.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tags: true
            }
        });
        return NextResponse.json(threads);
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
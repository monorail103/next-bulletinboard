// タグをすべて取得する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Server } from "socket.io";

export const GET = async (req: NextRequest) => {
    try {
        const tags = await prisma.tag.findMany({
            orderBy: {
                name: 'asc'
            },
        });
        return NextResponse.json(tags);
    }
    catch (e) {
        return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 });
    }
}
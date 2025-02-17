// タグをすべて取得する
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
    try {
        const tags = await prisma.tag.findMany({
            orderBy: {
                name: 'asc'
            },
        });
        return NextResponse.json(tags);
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
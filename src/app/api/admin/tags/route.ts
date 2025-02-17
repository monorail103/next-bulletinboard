// タグを追加するためのAPI
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { name } = await req.json();
    
    try {
        await prisma.tag.create({
            data: {
                name
            }
        });
        return NextResponse.json({ message: "Tag created" });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
};
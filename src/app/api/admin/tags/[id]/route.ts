// タグを削除するためのAPI
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    
    try {
        await prisma.tag.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({ message: "Tag deleted" });
    }
    catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
};
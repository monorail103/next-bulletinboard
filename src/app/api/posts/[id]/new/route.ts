// 特定のスレッドに書き込む
// POST /api/posts/[id]/new
import prisma from "@/lib/prisma";
import { generateId } from "@/app/_utils/generateId";
import { NextResponse, NextRequest } from "next/server";

type RequestBody = {
    content: string;
  };

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const { content }: RequestBody = await req.json();

    try {
        if (!id) {
            return NextResponse.json({ error: "Missing thread ID" }, { status: 400 });
        }

        if (!content) {
            return NextResponse.json({ error: "Missing content" }, { status: 400 });
        }

        const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "";
        const username = generateId(ip);

        const post = await prisma.post.create({
            data: {
                content,
                ThreadId: id,
                username: username,
                ipaddress: ip,
            }
        });

        return NextResponse.json(post);
    } catch (e) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
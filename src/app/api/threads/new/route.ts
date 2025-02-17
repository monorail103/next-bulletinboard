import { NextResponse, NextRequest } from "next/server";
import { generateId } from "@/app/_utils/generateId";
import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
    const { threadTitle, postContent } = await req.json();

    if (!threadTitle || !postContent) {
        return NextResponse.json({ error: 'Thread title and post content are required' }, { status: 500 });
    }

    try {
        const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "";
        // スレッドを作成
        const thread = await prisma.thread.create({
            data: {
                title: threadTitle,
                ipaddress: ip,
            },
        });

        // ユーザー名を生成
        const username = generateId(ip);

        // 投稿を作成
        const post = await prisma.post.create({
            data: {
                content: postContent,
                ThreadId: thread.id, // スレッドIDを関連付ける
                username: username,
                ipaddress: ip,

            },
        });

        return NextResponse.json({ thread, post }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
};
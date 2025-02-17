import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 既存のタグを削除
  await prisma.tag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.thread.deleteMany();

  // タグを作成
  const tag1 = await prisma.tag.create({
    data: {
      name: 'JavaScript',
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: 'TypeScript',
    },
  });

  // スレッドを作成
  const thread = await prisma.thread.create({
    data: {
      title: 'テストスレッド1',
      ipaddress: '127.0.0.1',
      tags: {
        connect: [
          { id: tag1.id },
          { id: tag2.id },
        ],
      },
    },
  });


  // 投稿を作成
  await prisma.post.create({
    data: {
      content: 'テスト投稿1',
      ThreadId: thread.id,
      username: 'testuser',
      ipaddress: '127.0.0.1',
    },
  });

  await prisma.post.create({
    data: {
      content: 'テスト投稿2',
      ThreadId: thread.id,
      username: 'testuser',
      ipaddress: '127.0.0.1',
    },
  });

}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
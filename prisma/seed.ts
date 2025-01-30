import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // スレッドの作成
  const thread1 = await prisma.thread.create({
    data: {
      title: '最初のスレッド',
      ipaddress: '192.168.1.1',
      isActive: true,
    },
  });

  // スレッドに関連する書き込みの作成
  await prisma.post.create({
    data: {
      content: '最初の書き込み',
      ThreadId: thread1.id,
      username: 'ユーザー1',
      ipaddress: '192.168.1.1',
    },
  });

  const thread2 = await prisma.thread.create({
    data: {
      title: '二番目のスレッド',
      ipaddress: '192.168.1.2',
      isActive: true,
    },
  });

  await prisma.post.create({
    data: {
      content: '二番目のスレッドの最初の書き込み',
      ThreadId: thread2.id,
      username: 'ユーザー2',
      ipaddress: '192.168.1.2',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
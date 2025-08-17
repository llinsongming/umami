import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 触发一次极轻量 DB 查询，防止 Neon 休眠
    await prisma.client.$queryRaw`select 1`;
    return new Response('ok', { status: 200, headers: { 'content-type': 'text/plain' } });
  } catch {
    return new Response('fail', { status: 500, headers: { 'content-type': 'text/plain' } });
  }
}

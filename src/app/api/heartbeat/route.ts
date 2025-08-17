import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function headersOk() {
  return {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
  };
}

async function pingDb() {
  // 唤醒 Neon（首次可能 3–10 秒）
  await prisma.client.$queryRaw`select 1`;
}

export async function GET() {
  await pingDb();
  return new Response('ok', { status: 200, headers: headersOk() });
}

export async function HEAD() {
  await pingDb();
  return new Response(null, { status: 200, headers: headersOk() });
}

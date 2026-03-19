// app/api/stats/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { fetchStats } from '@/lib/stats';

export async function GET(req: NextRequest) {

  const stats = await fetchStats();

  return NextResponse.json(stats);
}
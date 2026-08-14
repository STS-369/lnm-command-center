// API routes removed for static export — data is now client-side via localStorage
export const dynamic = 'force-static';

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([]);
}

export async function POST() {
  return NextResponse.json({ error: 'Not available in static mode' }, { status: 501 });
}

import { NextResponse } from 'next/server';
import { MOCK_VOCABULARIES } from '@/lib/constants/vocabularies';
export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_VOCABULARIES });
}
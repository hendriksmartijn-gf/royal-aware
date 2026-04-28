import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token  = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    return NextResponse.json({
      error: 'Missing env vars',
      AIRTABLE_TOKEN:   token  ? '✅ set' : '❌ missing',
      AIRTABLE_BASE_ID: baseId ? '✅ set' : '❌ missing',
    }, { status: 500 });
  }

  const url = new URL(`https://api.airtable.com/v0/${baseId}/tblCyyli7PN6ykVc8`);
  url.searchParams.set('pageSize', '5');

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({
      error: `Airtable HTTP ${res.status}`,
      body,
      AIRTABLE_BASE_ID: baseId,
    }, { status: 502 });
  }

  const data = await res.json();
  const records = data.records ?? [];

  return NextResponse.json({
    status:       '✅ Airtable reachable',
    totalFetched: records.length,
    AIRTABLE_BASE_ID: baseId,
    // Show field keys + Active value of first 5 records (no sensitive data)
    sample: records.map((r: { id: string; fields: Record<string, unknown> }) => ({
      id:     r.id,
      name:   r.fields['Name'] ?? '(no Name field)',
      Active: r.fields['Active'] ?? '(field absent / false)',
      fieldKeys: Object.keys(r.fields),
    })),
  });
}

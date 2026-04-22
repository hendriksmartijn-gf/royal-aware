import type { Product, AirtableAttachment } from '@/types/product';

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

function mapRecord(record: AirtableRecord): Product {
  const f = record.fields;

  const toBoolean = (v: unknown): boolean => {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'string') return v.toLowerCase() === 'true';
    return false;
  };

  const toStringArray = (v: unknown): string[] => {
    if (Array.isArray(v)) return v.map(String);
    if (typeof v === 'string' && v.trim()) return v.split(',').map((s) => s.trim());
    return [];
  };

  return {
    id: record.id,
    name:            String(f['Name'] ?? ''),
    productCategory: String(f['Product Category'] ?? ''),
    subCategory:     String(f['Sub Category'] ?? ''),
    cheeseType:      String(f['Cheese Type'] ?? ''),
    ageRipening:     String(f['Age / Ripening'] ?? ''),
    formatsWeights:  String(f['Formats / Weights'] ?? ''),
    retail:          toBoolean(f['Retail']),
    export:          toBoolean(f['Export']),
    foodservice:     toBoolean(f['Foodservice']),
    foodIndustry:    toBoolean(f['Food Industry']),
    brand:           String(f['Brand'] ?? ''),
    packagingType:   String(f['Packaging Type'] ?? ''),
    shelfLife:       String(f['Shelf Life'] ?? ''),
    certifications:  toStringArray(f['Certifications']),
    applications:    String(f['Applications'] ?? ''),
    descriptionEN:   String(f['Description EN'] ?? ''),
    photo:           Array.isArray(f['Photo']) ? (f['Photo'] as AirtableAttachment[]) : [],
    active:          toBoolean(f['Active']),
  };
}

export async function getProducts(): Promise<Product[]> {
  const token  = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.warn('Airtable credentials not configured — returning empty product list.');
    return [];
  }

  const baseUrl = `https://api.airtable.com/v0/${baseId}/tblCyyli7PN6ykVc8`;
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(baseUrl);
    url.searchParams.set('filterByFormula', '{Active}=TRUE()');
    url.searchParams.set('pageSize', '100');
    if (offset) url.searchParams.set('offset', offset);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Airtable API error ${res.status}: ${body}`);
      return [];
    }

    const data: AirtableResponse = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records.map(mapRecord);
}

export async function getProduct(id: string): Promise<Product | null> {
  const token  = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) return null;

  const url = `https://api.airtable.com/v0/${baseId}/tblCyyli7PN6ykVc8/${id}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const record: AirtableRecord = await res.json();
  const product = mapRecord(record);
  return product.active ? product : null;
}

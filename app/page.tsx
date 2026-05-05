import { getProducts } from '@/lib/airtable';
import { CatalogClient } from '@/components/CatalogClient';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-headline-sm text-white tracking-tight">Product Catalog</h1>
            <p className="text-[13px] text-white/60 mt-0.5 font-normal">Royal A-ware</p>
          </div>
          {/* Lime accent mark */}
          <div className="w-2 h-10 bg-secondary" />
        </div>
      </header>

      <CatalogClient products={products} />
    </div>
  );
}

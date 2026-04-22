import Image from 'next/image';
import { getProducts } from '@/lib/airtable';
import { CatalogClient } from '@/components/CatalogClient';

export const revalidate = 3600;

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-600 text-white">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Product Catalog</h1>
            <p className="text-navy-200 text-xs mt-0.5">Royal A-ware</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-amber-400 font-bold text-sm">RA</span>
          </div>
        </div>
      </header>

      {/* Client-side search + filter + grid */}
      <CatalogClient products={products} />
    </div>
  );
}

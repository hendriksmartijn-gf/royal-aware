import { getProducts } from '@/lib/airtable';
import { CatalogClient } from '@/components/CatalogClient';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#F0F3F7]">

      {/* Header — white bg so logo reads correctly */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        {/* Lime accent top strip */}
        <div className="h-1 bg-secondary w-full" />
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.royal-aware.com/nl/assets/images/logo-aware.svg"
            alt="Royal A-ware"
            height={48}
            width={41}
            className="h-12 w-auto"
          />
          {/* Right: label */}
          <span className="text-label-md font-bold text-primary/50 uppercase tracking-widest">
            Product Catalog
          </span>
        </div>
      </header>

      <CatalogClient products={products} />
    </div>
  );
}

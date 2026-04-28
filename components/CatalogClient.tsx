'use client';

import { useState, useMemo, useTransition } from 'react';
import type { Product, Channel, ProductCategory } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ExportButton } from './ExportButton';

const CHANNELS: { label: string; key: Channel | 'All' }[] = [
  { label: 'All',          key: 'All' },
  { label: 'Retail',       key: 'Retail' },
  { label: 'Export',       key: 'Export' },
  { label: 'Foodservice',  key: 'Foodservice' },
  { label: 'Food Industry',key: 'Food Industry' },
];

const CATEGORIES: { label: string; key: ProductCategory | 'All' }[] = [
  { label: 'All',               key: 'All' },
  { label: 'Packaged Cheese',   key: 'Packaged Cheese' },
  { label: 'Whole Packed',      key: 'Whole Packed' },
  { label: 'Processed & Smoked',key: 'Processed & Smoked' },
  { label: 'Dried Cheese',      key: 'Dried Cheese' },
  { label: 'Cream',             key: 'Cream' },
];

function matchesSearch(product: Product, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    product.name.toLowerCase().includes(q) ||
    product.cheeseType.toLowerCase().includes(q) ||
    product.subCategory.toLowerCase().includes(q)
  );
}

function matchesChannel(product: Product, channel: Channel | 'All'): boolean {
  if (channel === 'All') return true;
  if (channel === 'Retail')        return product.retail;
  if (channel === 'Export')        return product.export;
  if (channel === 'Foodservice')   return product.foodservice;
  if (channel === 'Food Industry') return product.foodIndustry;
  return true;
}

function matchesCategory(product: Product, category: ProductCategory | 'All'): boolean {
  if (category === 'All') return true;
  return product.productCategory === category;
}

interface Props {
  products: Product[];
}

export function CatalogClient({ products }: Props) {
  const [query,        setQuery]       = useState('');
  const [channel,      setChannel]     = useState<Channel | 'All'>('All');
  const [category,     setCategory]    = useState<ProductCategory | 'All'>('All');
  const [selectMode,   setSelectMode]  = useState(false);
  const [selectedIds,  setSelectedIds] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return products.filter(
      (p) => matchesSearch(p, query) && matchesChannel(p, channel) && matchesCategory(p, category)
    );
  }, [products, query, channel, category]);

  const selectedProducts = useMemo(
    () => products.filter((p) => selectedIds.has(p.id)),
    [products, selectedIds]
  );

  function toggleProduct(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  }

  function exitSelectMode() {
    setSelectMode(false);
    setSelectedIds(new Set());
  }

  const allFilteredSelected = filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));

  return (
    <div className={selectMode ? 'pb-28' : ''}>
      {/* ── Sticky filter bar ───────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        {/* Search + Select toggle */}
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search products…"
              value={query}
              onChange={(e) => startTransition(() => setQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                         text-base placeholder-gray-400 focus:outline-none focus:ring-2
                         focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>

          {/* Select mode toggle */}
          <button
            onClick={() => selectMode ? exitSelectMode() : setSelectMode(true)}
            className={`flex-none flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium
              min-h-[44px] transition border
              ${selectMode
                ? 'bg-navy-600 text-white border-navy-600'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {selectMode ? 'Done' : 'Select'}
          </button>
        </div>

        {/* Channel chips */}
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto no-scrollbar">
          {CHANNELS.map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setChannel(key)}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap min-h-[36px]
                ${channel === key
                  ? 'bg-navy-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap min-h-[36px]
                ${category === key
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results count / select-all bar ──────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-sm text-gray-500">
          {selectMode
            ? `${selectedIds.size} of ${filtered.length} selected`
            : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}${(query || channel !== 'All' || category !== 'All') ? ' found' : ''}`
          }
        </span>

        {selectMode && filtered.length > 0 && (
          <button
            onClick={toggleSelectAll}
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            {allFilteredSelected ? 'Deselect all' : 'Select all'}
          </button>
        )}
      </div>

      {/* ── Product grid ────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pb-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectable={selectMode}
              selected={selectedIds.has(product.id)}
              onToggle={toggleProduct}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4">
          <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 font-medium">No products found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          <button
            onClick={() => { setQuery(''); setChannel('All'); setCategory('All'); }}
            className="mt-4 text-sm text-amber-600 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ── Sticky export bar (slides up when items selected) ───── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-lg
          transition-transform duration-300 ease-in-out safe-bottom
          ${selectMode && selectedIds.size > 0 ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between px-4 py-4 max-w-2xl mx-auto">
          <div>
            <p className="font-semibold text-gray-900">
              {selectedIds.size} product{selectedIds.size !== 1 ? 's' : ''} selected
            </p>
            <p className="text-xs text-gray-400">A4 PDF, one product per page</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-sm text-gray-400 hover:text-gray-600 min-h-[44px] px-2"
            >
              Clear
            </button>
            <ExportButton
              products={selectedProducts}
              onDone={exitSelectMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

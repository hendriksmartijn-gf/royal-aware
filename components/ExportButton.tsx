'use client';

import { useState } from 'react';
import type { Product } from '@/types/product';

interface Props {
  products: Product[];
  onDone?: () => void;
}

export function ExportButton({ products, onDone }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    if (products.length === 0) return;
    setLoading(true);

    try {
      // Lazy-load to keep the PDF renderer out of the initial bundle
      const [{ pdf }, { createElement }, { ProductCatalogPDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('react'),
        import('./ProductPDF'),
      ]);

      // Cast needed: @react-pdf/renderer's pdf() expects its own ReactElement
      // subtype, but createElement returns the wider React type.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(
        createElement(ProductCatalogPDF, { products }) as any
      ).toBlob();

      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `royal-aware-products-${new Date().toISOString().slice(0, 10)}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      onDone?.();
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading || products.length === 0}
      className="flex items-center gap-2 px-5 py-3 bg-amber-500 text-white rounded-xl
                 font-semibold text-sm min-h-[44px] active:scale-95 transition
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating PDF…
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export PDF ({products.length})
        </>
      )}
    </button>
  );
}

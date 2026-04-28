import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/airtable';
import { ChannelBadge } from '@/components/ChannelBadge';
import { ShareButton } from '@/components/ShareButton';
import type { Channel } from '@/types/product';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const channels: Channel[] = [];
  if (product.retail)       channels.push('Retail');
  if (product.export)       channels.push('Export');
  if (product.foodservice)  channels.push('Foodservice');
  if (product.foodIndustry) channels.push('Food Industry');

  const photoUrl = product.photo[0]?.url;

  const specs: { label: string; value: string }[] = [
    { label: 'Brand',          value: product.brand },
    { label: 'Cheese Type',    value: product.cheeseType },
    { label: 'Age / Ripening', value: product.ageRipening },
    { label: 'Formats / Weights', value: product.formatsWeights },
    { label: 'Packaging',      value: product.packagingType },
    { label: 'Shelf Life',     value: product.shelfLife },
  ].filter((s) => s.value);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back nav */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3 min-h-[56px]">
          <Link
            href="/"
            className="flex items-center gap-1 text-navy-600 font-medium min-h-[44px] min-w-[44px] -ml-2 px-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Catalog</span>
          </Link>
          <span className="flex-1 text-sm font-semibold text-gray-800 truncate">{product.name}</span>
        </div>
      </div>

      {/* Hero photo */}
      <div className="relative aspect-[16/9] bg-gray-100">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <svg className="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="px-4 py-5 space-y-6 max-w-2xl mx-auto">
        {/* Title + category */}
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.productCategory && (
              <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                {product.productCategory}
              </span>
            )}
            {product.subCategory && (
              <span className="text-xs text-gray-400">· {product.subCategory}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>

          {/* Channels */}
          {channels.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {channels.map((ch) => <ChannelBadge key={ch} channel={ch} />)}
            </div>
          )}
        </div>

        {/* Description */}
        {product.descriptionEN && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.descriptionEN}</p>
          </div>
        )}

        {/* Specs table */}
        {specs.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Specifications</h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {specs.map(({ label, value }, i) => (
                <div key={label} className={`flex px-4 py-3 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
                  <span className="text-sm text-gray-500 w-36 flex-none">{label}</span>
                  <span className="text-sm text-gray-900 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-navy-600/10 text-navy-700 border border-navy-600/20"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Applications */}
        {product.applications && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Applications</h2>
            <p className="text-gray-700 leading-relaxed">{product.applications}</p>
          </div>
        )}

        {/* Share */}
        <div className="pt-2 pb-8">
          <ShareButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}

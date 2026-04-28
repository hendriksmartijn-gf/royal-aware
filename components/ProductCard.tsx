import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { ChannelBadge } from './ChannelBadge';
import type { Channel } from '@/types/product';

const CATEGORY_COLORS: Record<string, string> = {
  'Packaged Cheese':    'bg-amber-500/20 text-amber-700',
  'Whole Packed':       'bg-navy-600/10 text-navy-600',
  'Processed & Smoked': 'bg-red-100 text-red-700',
  'Dried Cheese':       'bg-yellow-100 text-yellow-700',
  'Cream':              'bg-pink-100 text-pink-700',
};

const PLACEHOLDER_COLORS: Record<string, string> = {
  'Packaged Cheese':    'bg-amber-100',
  'Whole Packed':       'bg-blue-100',
  'Processed & Smoked': 'bg-red-100',
  'Dried Cheese':       'bg-yellow-100',
  'Cream':              'bg-pink-100',
};

interface Props {
  product: Product;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: (id: string) => void;
}

export function ProductCard({ product, selectable, selected, onToggle }: Props) {
  const channels: Channel[] = [];
  if (product.retail)       channels.push('Retail');
  if (product.export)       channels.push('Export');
  if (product.foodservice)  channels.push('Foodservice');
  if (product.foodIndustry) channels.push('Food Industry');

  const photoUrl = product.photo[0]?.thumbnails?.large?.url ?? product.photo[0]?.url;
  const placeholderColor = PLACEHOLDER_COLORS[product.productCategory] ?? 'bg-gray-100';
  const categoryStyle = CATEGORY_COLORS[product.productCategory] ?? 'bg-gray-100 text-gray-600';

  const cardContent = (
    <>
      {/* Photo */}
      <div className={`relative aspect-[4/3] ${!photoUrl ? placeholderColor : ''}`}>
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Sub-category badge */}
        {product.subCategory && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold ${categoryStyle}`}>
            {product.subCategory}
          </span>
        )}

        {/* Selection checkbox overlay */}
        {selectable && (
          <div className={`absolute top-2 right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
            ${selected
              ? 'bg-amber-500 border-amber-500'
              : 'bg-white/80 border-gray-300 backdrop-blur-sm'
            }`}
          >
            {selected && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        )}

        {/* Selected dim overlay */}
        {selectable && selected && (
          <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className={`font-semibold text-base leading-tight line-clamp-2 transition-colors
          ${selected ? 'text-amber-600' : 'text-gray-900 group-hover:text-navy-600'}`}
        >
          {product.name}
        </h3>

        {product.cheeseType && (
          <p className="text-sm text-gray-500">{product.cheeseType}</p>
        )}

        {channels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {channels.map((ch) => <ChannelBadge key={ch} channel={ch} />)}
          </div>
        )}

        {product.formatsWeights && (
          <p className="text-xs text-gray-400 truncate">{product.formatsWeights}</p>
        )}
      </div>
    </>
  );

  if (selectable) {
    return (
      <button
        type="button"
        onClick={() => onToggle?.(product.id)}
        className={`group w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm border
          active:scale-[0.98] transition-all duration-150
          ${selected
            ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-amber-100'
            : 'border-gray-100 hover:shadow-md'
          }`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md active:scale-[0.98] transition-all duration-150"
    >
      {cardContent}
    </Link>
  );
}

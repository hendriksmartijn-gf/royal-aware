import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { ChannelBadge } from './ChannelBadge';
import type { Channel } from '@/types/product';

// Sub-category badge colour per category
const CATEGORY_COLORS: Record<string, string> = {
  'Packaged Cheese':    'bg-secondary/20 text-primary',
  'Whole Packed':       'bg-primary/10 text-primary',
  'Processed & Smoked': 'bg-red-100 text-red-700',
  'Dried Cheese':       'bg-yellow-100 text-yellow-700',
  'Cream':              'bg-pink-100 text-pink-700',
};

// Photo placeholder tint per category
const PLACEHOLDER_COLORS: Record<string, string> = {
  'Packaged Cheese':    'bg-secondary/10',
  'Whole Packed':       'bg-primary/10',
  'Processed & Smoked': 'bg-red-50',
  'Dried Cheese':       'bg-yellow-50',
  'Cream':              'bg-pink-50',
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

  const photoUrl         = product.photo[0]?.thumbnails?.large?.url ?? product.photo[0]?.url;
  const placeholderColor = PLACEHOLDER_COLORS[product.productCategory] ?? 'bg-gray-50';
  const categoryStyle    = CATEGORY_COLORS[product.productCategory]    ?? 'bg-gray-100 text-gray-600';

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
            <svg className="w-14 h-14 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Sub-category badge */}
        {product.subCategory && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 text-label-sm font-bold ${categoryStyle}`}>
            {product.subCategory}
          </span>
        )}

        {/* Selection checkbox */}
        {selectable && (
          <div className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center
            border-2 transition-all
            ${selected
              ? 'bg-secondary border-secondary'
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

        {/* Selected tint */}
        {selectable && selected && (
          <div className="absolute inset-0 bg-secondary/10 pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Left accent bar + name */}
        <div className="flex items-start gap-2">
          {selected && <div className="w-1 h-full bg-secondary mt-0.5 flex-none self-stretch min-h-[20px]" />}
          <h3 className={`font-bold text-body-lg leading-tight line-clamp-2 transition-colors
            ${selected ? 'text-secondary' : 'text-primary group-hover:text-secondary'}`}
          >
            {product.name}
          </h3>
        </div>

        {product.cheeseType && (
          <p className="text-body-sm text-gray-500">{product.cheeseType}</p>
        )}

        {channels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {channels.map((ch) => <ChannelBadge key={ch} channel={ch} />)}
          </div>
        )}

        {product.formatsWeights && (
          <p className="text-label-sm text-gray-400 truncate">{product.formatsWeights}</p>
        )}
      </div>
    </>
  );

  if (selectable) {
    return (
      <button
        type="button"
        onClick={() => onToggle?.(product.id)}
        className={`group w-full text-left bg-white overflow-hidden border
          active:scale-[0.98] transition-all duration-150
          ${selected
            ? 'border-secondary ring-2 ring-secondary/20'
            : 'border-gray-100 hover:border-primary/30 hover:shadow-sm'
          }`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white overflow-hidden border border-gray-100
                 hover:border-primary/30 hover:shadow-sm active:scale-[0.98]
                 transition-all duration-150"
    >
      {cardContent}
    </Link>
  );
}

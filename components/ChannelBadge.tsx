import type { Channel } from '@/types/product';

const styles: Record<Channel, string> = {
  'Retail':       'bg-blue-100 text-blue-800',
  'Export':       'bg-green-100 text-green-800',
  'Foodservice':  'bg-orange-100 text-orange-800',
  'Food Industry':'bg-purple-100 text-purple-800',
};

export function ChannelBadge({ channel }: { channel: Channel }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[channel]}`}>
      {channel}
    </span>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-navy-600/10 flex items-center justify-center mb-4">
        <span className="text-2xl font-bold text-navy-600">?</span>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Product not found</h1>
      <p className="text-gray-500 text-sm mb-6">This product may have been removed or the link is incorrect.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-3 bg-navy-600 text-white rounded-xl font-medium text-sm min-h-[44px]"
      >
        Back to catalog
      </Link>
    </div>
  );
}

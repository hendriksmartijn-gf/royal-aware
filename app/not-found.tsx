import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-2xl font-bold text-primary">?</span>
      </div>
      <h1 className="text-headline-sm mb-2">Product not found</h1>
      <p className="text-body-sm text-gray-500 mb-6">
        This product may have been removed or the link is incorrect.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 bg-secondary text-white font-bold text-label-md
                   h-btn hover:bg-primary transition-colors min-w-[44px]"
      >
        Back to catalog
      </Link>
    </div>
  );
}

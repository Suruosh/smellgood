import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'Alla Parfymer — SmellGood',
  description: 'Utforska över 250 lyxparfymer i fickformat. Herr, dam och unisex dofter från världens bästa parfymhus.',
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-stone-200 rounded" />
            <div className="h-4 w-24 bg-stone-200 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-stone-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}

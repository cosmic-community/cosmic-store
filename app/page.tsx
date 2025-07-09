import { getProducts, getCollections } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';
import { Product, Collection } from '@/lib/types';

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections()
  ]);

  const featuredProducts = products.filter((product: Product) => 
    product.metadata.featured_product === true
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Cosmic Store
        </h1>
        <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium">
          Discover premium products curated just for you. Shop our featured collections and find exactly what you're looking for.
        </p>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shop by Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection: Collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
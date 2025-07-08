import { getAllProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/types'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Products</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover our complete collection of premium products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
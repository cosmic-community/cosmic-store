// app/products/[slug]/page.tsx
import { getProductBySlug, getReviewsByProduct } from '@/lib/cosmic'
import ProductGallery from '@/components/ProductGallery'
import ReviewCard from '@/components/ReviewCard'
import AddToCartButton from '@/components/AddToCartButton'
import { Product, Review } from '@/lib/types'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  const product = await getProductBySlug(slug)
  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Gallery */}
        <div>
          <ProductGallery 
            featuredImage={product.metadata.featured_image}
            gallery={product.metadata.product_gallery || []}
            productName={product.metadata.name}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.metadata.name}
          </h1>
          
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            ${product.metadata.price}
          </div>

          <div className="prose max-w-none mb-6 text-gray-700 dark:text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: product.metadata.description || '' }} />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">SKU: {product.metadata.sku}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Stock: {product.metadata.inventory_count} units
            </p>
            <p className="text-sm mb-4">
              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                product.metadata.in_stock 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
              }`}>
                {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
          </div>

          <AddToCartButton product={product} className="w-full mb-4" />

          {product.metadata.collections && product.metadata.collections.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Collections:</h3>
              <div className="flex flex-wrap gap-2">
                {product.metadata.collections.map((collection: any) => (
                  <span 
                    key={collection.id}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {collection.metadata?.name || collection.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  )
}
import Link from 'next/link'
import { Product } from '@/lib/types'
import AddToCartButton from './AddToCartButton'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata.featured_image?.imgix_url 
    ? `${product.metadata.featured_image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`
    : '/placeholder-product.jpg'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-w-4 aspect-h-3">
          <img
            src={imageUrl}
            alt={product.metadata.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
            {product.metadata.name}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2 font-medium">
            {product.metadata.description?.replace(/<[^>]*>/g, '') || ''}
          </p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${product.metadata.price}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              product.metadata.in_stock 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
            }`}>
              {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <AddToCartButton product={product} className="w-full" />
      </div>
    </div>
  )
}
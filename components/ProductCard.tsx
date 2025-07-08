import Link from 'next/link'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata.featured_image?.imgix_url 
    ? `${product.metadata.featured_image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`
    : '/placeholder-product.jpg'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-w-4 aspect-h-3">
          <img
            src={imageUrl}
            alt={product.metadata.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            {product.metadata.name}
          </h3>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2 font-medium">
            {product.metadata.description?.replace(/<[^>]*>/g, '') || ''}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.metadata.price}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              product.metadata.in_stock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
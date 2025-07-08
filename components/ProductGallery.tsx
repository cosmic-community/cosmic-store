'use client'

import { useState } from 'react'
import { CosmicFile } from '@/lib/types'

interface ProductGalleryProps {
  featuredImage: CosmicFile
  gallery: CosmicFile[]
  productName: string
}

export default function ProductGallery({ 
  featuredImage, 
  gallery, 
  productName 
}: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  
  const allImages = [featuredImage, ...(gallery || [])]
  
  const currentImageUrl = allImages[currentImage]?.imgix_url
    ? `${allImages[currentImage].imgix_url}?w=600&h=600&fit=crop&auto=format,compress`
    : '/placeholder-product.jpg'

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={currentImageUrl}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                currentImage === index 
                  ? 'border-blue-500 dark:border-blue-400' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <img
                src={image.imgix_url ? `${image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress` : '/placeholder-product.jpg'}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
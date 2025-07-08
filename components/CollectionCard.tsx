import Link from 'next/link'
import { Collection } from '@/lib/types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const imageUrl = collection.metadata.featured_image?.imgix_url 
    ? `${collection.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`
    : '/placeholder-collection.jpg'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/collections/${collection.slug}`}>
        <div className="aspect-w-3 aspect-h-2">
          <img
            src={imageUrl}
            alt={collection.metadata.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-xl text-gray-900 mb-2">
            {collection.metadata.name}
          </h3>
          <p className="text-gray-700 font-medium">
            {collection.metadata.description}
          </p>
        </div>
      </Link>
    </div>
  )
}
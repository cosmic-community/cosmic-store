import { getAllCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'
import { Collection } from '@/lib/types'

export default async function CollectionsPage() {
  const collections = await getAllCollections()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Collections</h1>
        <p className="text-gray-600">Explore our curated collections of premium products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection: Collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}
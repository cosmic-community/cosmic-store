// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getProductsByCollection } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/types'
import { notFound } from 'next/navigation'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  
  const collection = await getCollectionBySlug(slug)
  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {collection.metadata.name}
        </h1>
        <p className="text-gray-600">{collection.metadata.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
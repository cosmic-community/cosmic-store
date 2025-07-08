import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Collection, Review, ContactPage } from './types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
  apiEnvironment: "staging",
})

export async function getProducts(): Promise<Product[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return getProducts()
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return getProduct(slug)
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export async function getAllCollections(): Promise<Collection[]> {
  return getCollections()
}

export async function getCollection(slug: string): Promise<Collection | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object || null
  } catch (error) {
    console.error('Error fetching collection:', error)
    return null
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return getCollection(slug)
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.collections': collectionId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error) {
    console.error('Error fetching products by collection:', error)
    return []
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error) {
    console.error('Error fetching reviews by product:', error)
    return []
  }
}

export async function getContactPage(): Promise<ContactPage | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'pages', slug: 'contact' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object || null
  } catch (error) {
    console.error('Error fetching contact page:', error)
    return null
  }
}

export async function createContactSubmission(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    const { object } = await cosmic.objects.insertOne({
      title: `Contact from ${data.name}`,
      type: 'contact-submissions',
      metadata: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        submitted_at: new Date().toISOString(),
      },
    })

    return object
  } catch (error) {
    console.error('Error creating contact submission:', error)
    throw error
  }
}
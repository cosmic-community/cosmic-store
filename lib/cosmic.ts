import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Collection, Review, ContactPage, ContactSubmission, ContactFormData } from './types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  apiEnvironment: "staging",
})

const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
  apiEnvironment: "staging",
})

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getAllCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.collections': collectionId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'reviews',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getContactPage(): Promise<ContactPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'contact-pages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function createContactSubmission(data: ContactFormData): Promise<ContactSubmission> {
  const submissionData = {
    title: `Contact from ${data.name}`,
    type: 'contact-submissions',
    status: 'published',
    metadata: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      submission_date: new Date().toISOString(),
      status: 'New'
    }
  }

  const response = await cosmicWrite.objects.insertOne(submissionData)
  return response.object
}
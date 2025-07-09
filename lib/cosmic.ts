import { createBucketClient } from '@cosmicjs/sdk';
import { Product, Collection, Review, ContactSubmission, Page, CosmicError, CosmicResponse, CosmicSingleResponse } from './types';

// Create bucket client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
});

// Helper function to handle Cosmic API errors
function handleCosmicError(error: any): CosmicError {
  if (error.status === 404) {
    return { message: 'Resource not found', status: 404 };
  }
  return { message: error.message || 'An error occurred', status: error.status || 500 };
}

// Products
export async function getProducts(limit = 100): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit);
    
    return response.objects as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Alias for backward compatibility
export const getAllProducts = getProducts;

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products', 'metadata.featured_product': true })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Collection[];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

// Alias for backward compatibility
export const getAllCollections = getCollections;

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Collection;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products', 'metadata.collections': collectionId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    console.error('Error fetching products by collection:', error);
    return [];
  }
}

// Reviews
export async function getReviews(limit = 100): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit);
    
    return response.objects as Review[];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.product': productId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Review[];
  } catch (error) {
    console.error('Error fetching reviews by product:', error);
    return [];
  }
}

// Contact
export async function createContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactSubmission | null> {
  try {
    const response = await cosmic.objects.insertOne({
      title: `Contact from ${data.name}`,
      type: 'contact-submissions',
      metadata: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        submitted_at: new Date().toISOString(),
      },
    });
    
    return response.object as ContactSubmission;
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return null;
  }
}

// Pages
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Page;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// Contact page specifically
export async function getContactPage(): Promise<Page | null> {
  return getPageBySlug('contact');
}
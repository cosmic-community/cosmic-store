import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
})

export async function getProducts() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCollections() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export async function getCollection(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object
  } catch (error) {
    console.error('Error fetching collection:', error)
    return null
  }
}

export async function getContactPage() {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'pages', slug: 'contact' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object
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
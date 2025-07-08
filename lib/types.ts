export interface Product {
  id: string
  title: string
  slug: string
  metadata: {
    description: string
    price: number
    images: Array<{
      imgix_url: string
      name: string
    }>
    category: string
    in_stock: boolean
    sku: string
    weight?: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
  }
}

export interface Collection {
  id: string
  title: string
  slug: string
  metadata: {
    description: string
    image: {
      imgix_url: string
    }
    products: Product[]
  }
}

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
  slug: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactPage {
  id: string
  title: string
  slug: string
  metadata: {
    page_title: string
    page_description: string
    contact_info: string
    form_title: string
    form_description: string
    success_message: string
  }
}

export interface ContactSubmission {
  id: string
  title: string
  metadata: {
    name: string
    email: string
    subject: string
    message: string
    submitted_at: string
  }
}
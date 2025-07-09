export interface Product {
  id: string;
  title: string;
  slug: string;
  metadata: {
    name: string;
    description: string;
    price: number;
    sku: string;
    inventory_count: number;
    featured_image?: CosmicFile;
    product_gallery?: CosmicFile[];
    collections?: Collection[];
    in_stock: boolean;
    featured_product: boolean;
  };
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  metadata: {
    name: string;
    description: string;
    featured_image?: CosmicFile;
    display_order: number;
  };
}

export interface Review {
  id: string;
  title: string;
  slug: string;
  metadata: {
    product: Product;
    customer_name: string;
    customer_email: string;
    rating: {
      key: string;
      value: string;
    };
    review_title: string;
    review_content: string;
    verified_purchase: boolean;
    review_date: string;
  };
}

export interface ContactSubmission {
  id: string;
  title: string;
  slug: string;
  metadata: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submitted_at: string;
  };
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  metadata: {
    page_title: string;
    page_description: string;
    contact_info?: string;
    form_title: string;
    form_description?: string;
    success_message: string;
  };
}

export interface CosmicFile {
  url: string;
  imgix_url: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CosmicError {
  message: string;
  status?: number;
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}
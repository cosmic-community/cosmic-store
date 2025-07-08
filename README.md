# Cosmic E-commerce Store

A modern e-commerce platform built with Next.js and powered by Cosmic CMS. This application features a complete shopping experience with product catalog, collections, customer reviews, shopping cart, and Stripe checkout integration.

![Cosmic E-commerce Store](https://imgix.cosmicjs.com/c363a940-5c46-11f0-a051-23c10f41277a-photo-1498049794561-7780e7231661-1752011943288.jpg?w=1200&h=400&fit=crop&auto=format,compress)

## Features

- 🛍️ **Product Catalog**: Browse products with detailed information, images, and pricing
- 📦 **Collections**: Organize products into categories like Electronics and Home & Garden
- ⭐ **Customer Reviews**: Add and view product reviews with star ratings
- 🛒 **Shopping Cart**: Add products to cart with quantity management
- 💳 **Stripe Checkout**: Secure payment processing with Stripe
- 📧 **Email Notifications**: Automated email notifications using Resend
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🔍 **Product Search**: Search and filter products by collection
- ✨ **Modern UI**: Clean, professional design with optimized images

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=cosmic-store-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews. Enable the ability to add customer review on product, send notification using Resend. Add to cart and checkout using Stripe."

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket. Enable the ability to add a customer review on products, send notification using Resend. Add to cart and checkout using Stripe. Set apiEnvironment: "staging" in cosmic config"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: [Cosmic](https://www.cosmicjs.com) - Headless CMS
- **Payments**: Stripe
- **Email**: Resend
- **State Management**: React Context API
- **Image Optimization**: Imgix
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account and bucket
- Stripe account
- Resend account

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   RESEND_API_KEY=your-resend-api-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a Review
```typescript
const review = await cosmic.objects.insertOne({
  type: 'reviews',
  title: reviewData.title,
  metadata: {
    product: productId,
    customer_name: reviewData.customerName,
    customer_email: reviewData.customerEmail,
    rating: reviewData.rating,
    review_content: reviewData.content
  }
})
```

### Querying by Collection
```typescript
const products = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.collections': collectionId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This application leverages Cosmic's powerful features:

- **Object Types**: Products, Collections, Reviews
- **Metafields**: Rich product data, customer information, ratings
- **Object Relationships**: Products linked to collections, reviews linked to products
- **File Uploads**: Product images and galleries
- **Staging Environment**: Safe testing environment

For more information about Cosmic CMS, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy automatically

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `RESEND_API_KEY`

<!-- README_END -->
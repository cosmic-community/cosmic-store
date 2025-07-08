import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

export const formatAmountForStripe = (amount: number): number => {
  // Convert to cents
  return Math.round(amount * 100)
}

export const formatAmountFromStripe = (amount: number): number => {
  // Convert from cents to dollars
  return amount / 100
}
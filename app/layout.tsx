import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { CartProvider } from '@/contexts/CartContext'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cosmic Store - Modern E-commerce',
  description: 'A modern e-commerce store powered by Cosmic CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
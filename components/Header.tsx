import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import CartIcon from './CartIcon'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Cosmic Store
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Products
            </Link>
            <Link href="/collections" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Collections
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <CartIcon />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
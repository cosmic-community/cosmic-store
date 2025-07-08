'use client'

import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'system', label: 'System', icon: Monitor }
  ] as const

  const currentTheme = themes.find(t => t.key === theme) || themes[2]
  const Icon = currentTheme.icon

  // Add keyboard shortcut for theme toggle
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      // Check for Cmd+/ (Mac) or Ctrl+/ (Windows/Linux)
      if (event.key === '/' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        
        // Cycle through themes: light -> dark -> system -> light
        const currentIndex = themes.findIndex(t => t.key === theme)
        const nextIndex = (currentIndex + 1) % themes.length
        // Fix: Add proper null check before calling setTheme
        if (setTheme) {
          setTheme(themes[nextIndex].key)
        }
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [theme, setTheme])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        aria-label="Toggle theme"
        title="Toggle theme (Cmd+/)"
      >
        <Icon className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="py-1">
              {themes.map((themeOption) => {
                const ThemeIcon = themeOption.icon
                return (
                  <button
                    key={themeOption.key}
                    onClick={() => {
                      // Fix: Add proper null check before calling setTheme
                      if (setTheme) {
                        setTheme(themeOption.key)
                      }
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                      theme === themeOption.key 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ThemeIcon className="w-4 h-4 mr-2" />
                    {themeOption.label}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
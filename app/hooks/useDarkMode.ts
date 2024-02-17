import { useEffect, useState } from 'react'

function useDarkMode() {
  const defaultTheme = process.env.NEXT_PUBLIC_DEFAULT_THEME === 'dark' ? 'dark' : 'light'
  const initialTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || defaultTheme : defaultTheme
  const [theme, setTheme] = useState(initialTheme)

  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === 'dark') {
      root.classList.add(theme)
    } else {
      root.classList.remove('dark')
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return [nextTheme, setTheme] as const
}

export default useDarkMode

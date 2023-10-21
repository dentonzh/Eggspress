import { useEffect, useState } from "react"

function useDarkMode() {
    const defaultTheme = process.env.NEXT_PUBLIC_DEFAULT_THEME === 'dark' ? 'dark' : 'light'
    const [theme, setTheme] = useState(
        localStorage.theme || defaultTheme
    )
    
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    useEffect(() => {
        const root = window.document.documentElement

        if (theme === 'dark') {
            root.classList.add(theme)
        } else {
            root.className = ''
        }

        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme)
        }
    }, [theme])

    return [nextTheme, setTheme]
}


export default useDarkMode
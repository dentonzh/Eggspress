import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'

const roboto_flex = Roboto_Flex({ subsets: ['latin'],  })

export const metadata: Metadata = {
  title: 'Eggspress',
  description: 'Eggspress is powered by Next.js, markdown, and GitHub issues',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto_flex.className} flex flex-col duration-200 dark:bg-gray-800 overflow-x-hidden min-h-screen justify-between`}>
        <Navigation />
        <div className="px-4 xs:px-0 container mb-12 grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

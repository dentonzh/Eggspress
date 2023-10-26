import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'
import { useEffect, useState } from 'react'

const roboto_flex = Roboto_Flex({ subsets: ['latin'],  })

export const metadata: Metadata = {
  title: 'Bliss',
  description: 'Bliss is powered by Next.js, markdown, and GitHub issues',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <body className={`${roboto_flex.className} flex flex-col duration-100 dark:bg-gray-800 overflow-x-hidden min-h-screen justify-between`}>
        <Navigation />
        <div className="px-3 sm:px-0 container mb-12 grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'
import { getEggspressSettings } from './utils'

const roboto_flex = Roboto_Flex({ subsets: ['latin'],  })

export const metadata: Metadata = {
  title: 'Eggspress',
  description: 'Eggspress is powered by Next.js, markdown, and GitHub issues',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const blogSettings = await getEggspressSettings('blog')

  return (
    <html lang="en">
      <body className={`${roboto_flex.className} flex flex-col duration-200 dark:bg-${blogSettings.colorDarkSecondary} overflow-x-hidden min-h-screen justify-between`}>
        <Navigation />
        <div className={`bg-${blogSettings.colorLightSecondary} dark:bg-${blogSettings.colorDarkSecondary}`}>
          <div className={`px-4 xs:px-0 container mb-12 grow bleed-bg bleed-${blogSettings.colorLightSecondary} dark:bleed-${blogSettings.colorDarkSecondary}`}>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}

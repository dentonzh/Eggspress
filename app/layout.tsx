import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'
import { getEggspressSettings } from './utils'

const roboto_flex = Roboto_Flex({ subsets: ['latin'],  })


export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')
  
  return {
    metadataBase: new URL(blogSettings.metaBaseUrl),
    title: {
      default: `%s - ${blogSettings.title}`,
    },
    description: blogSettings.description || blogSettings.ogDescription,
    openGraph: {
      title: blogSettings.title,
      description: blogSettings.ogDescription || blogSettings.description,
      url: '/',
      type: 'website',
      siteName: blogSettings.title,
      images: [
        {
          url: blogSettings.ogImageUrl,
          width: blogSettings.ogImageWidth,
          height: blogSettings.ogImageHeight,
          alt: 'Brand icon'
        }
      ]
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <html lang="en">
      <body className={`${roboto_flex.className} flex flex-col duration-200 dark:bg-${appearanceSettings.colorDarkSecondary} overflow-x-hidden min-h-screen justify-between`}>
        <Navigation />
        <div className={`bg-${appearanceSettings.colorLightSecondary} dark:bg-${appearanceSettings.colorDarkSecondary}`}>
          <div className={`px-4 xs:px-0 container mb-12 grow bleed-bg bleed-${appearanceSettings.colorLightSecondary} dark:bleed-${appearanceSettings.colorDarkSecondary}`}>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}

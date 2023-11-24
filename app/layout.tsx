import './globals.css'
import { Roboto_Flex } from 'next/font/google'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'
import { getEggspressSettings } from './utils'

const roboto_flex = Roboto_Flex({ subsets: ['latin'],  })


export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')

  if (blogSettings && blogSettings.code && blogSettings.code === 'ENOENT') {
    return {
      title: 'Welcome to Eggspress',
      description: 'This is a brand new Eggspress site. Check back later for updates!'
    }
  }
  
  return {
    metadataBase: blogSettings.metaBaseUrl.startsWith('http') ? new URL(blogSettings.metaBaseUrl) : '',
    title: {
      template: `%s - ${blogSettings.title}`,
      default: blogSettings.title
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
          url: `/assets/${blogSettings.ogImageFilename}`,
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
  let appearanceSettings = await getEggspressSettings('appearance')
  if (appearanceSettings && appearanceSettings.code && appearanceSettings.code === 'ENOENT') {
    appearanceSettings = {
      colorDarkPrimary: "slate-900",
      colorDarkSecondary: "slate-800",
      colorDarkFooter: "slate-900",
      colorLightPrimary: "gray-100",
      colorLightSecondary: "white",
      colorLightFooter: "gray-100",
    }
  }

  return (
    <html lang="en">
      <body className={`${roboto_flex.className} flex flex-col duration-200 dark:bg-${appearanceSettings.colorDarkSecondary} overflow-x-hidden min-h-screen justify-between`}>
        <Navigation />
        <div className={`mb-auto bg-${appearanceSettings.colorLightSecondary} dark:bg-${appearanceSettings.colorDarkSecondary}`}>
          <div className={`px-4 xs:px-0 container mb-12 grow bleed-bg bleed-${appearanceSettings.colorLightSecondary} dark:bleed-${appearanceSettings.colorDarkSecondary}`}>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}

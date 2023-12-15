import './globals.css'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'
import { getEggspressSettings } from './utils'
import Font from './_components/UserFont'
import Analytics from './_components/Analytics'

const font = Font

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
  const variablesSettings = await getEggspressSettings('variables')
  let appearanceSettings = await getEggspressSettings('appearance')
  if (appearanceSettings && appearanceSettings.code && appearanceSettings.code === 'ENOENT') {
    appearanceSettings = {
      colorThemeHeroDark: "slate-900",
      colorThemeBodyDark: "slate-800",
      colorThemeFooterDark: "slate-900",
      colorThemeHeroLight: "gray-100",
      colorThemeBodyLight: "white",
      colorThemeFooterLight: "gray-100",
    }
  }

  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col duration-200 bg-${appearanceSettings.colorThemeBodyLight || 'white'} dark:bg-${appearanceSettings.colorThemeBodyDark || 'slate-800'} overflow-x-hidden min-h-screen justify-between`}>
        <Navigation />
        <div className={`mb-auto bg-${appearanceSettings.colorThemeBodyLight} dark:bg-${appearanceSettings.colorThemeBodyDark}`}>
          <div className={`px-4 xs:px-0 container mb-12 grow bleed-bg bleed-${appearanceSettings.colorThemeBodyLight} dark:bleed-${appearanceSettings.colorThemeBodyDark}`}>
            {children}

            {process.env.NODE_ENV === 'production' && variablesSettings.googleAnalyticsPropertyId  &&
              <Analytics propertyId={variablesSettings.googleAnalyticsPropertyId}></Analytics>
            } 
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}

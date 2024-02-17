import './globals.css'
import './github-dark.css'
import './stackoverflow-light.css'
import Navigation from './_components/Navigation'
import Footer from './_components/Footer'
import { getEggspressSettings, getColors } from './utils'
import Font from './_components/UserFont'
import Analytics from './_components/Analytics'

const font = Font

export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')

  if (blogSettings && blogSettings.code && blogSettings.code === 'ENOENT') {
    return {
      title: 'Welcome to Eggspress',
      description: 'This is a brand new Eggspress site. Check back later for updates!',
    }
  }

  return {
    metadataBase: blogSettings.metaBaseUrl.startsWith('http') ? new URL(blogSettings.metaBaseUrl) : '',
    title: {
      template: `%s - ${blogSettings.title}`,
      default: blogSettings.title,
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
          alt: 'Brand icon',
        },
      ],
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const variablesSettings = await getEggspressSettings('variables')

  return (
    <html lang="en">
      <body
        className={`${font.className} flex flex-col duration-200 overflow-x-hidden min-h-screen justify-between ${await getColors('bg', 'ThemeBody', 'slate-800', 'white')}`}
      >
        <Navigation />
        <div className={`mb-auto ${await getColors('bg', 'ThemeBody', 'slate-800', 'white')}`}>
          <div
            className={`px-4 xs:px-0 container mb-12 grow bleed-bg ${await getColors('bleed', 'ThemeBody', 'slate-800', 'white')}`}
          >
            {children}

            {process.env.NODE_ENV === 'production' && variablesSettings.googleAnalyticsPropertyId && (
              <Analytics propertyId={variablesSettings.googleAnalyticsPropertyId}></Analytics>
            )}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}

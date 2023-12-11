import './globals.css'
import Navigation from './_components/Navigation'
import ExtGoogleAnalytics from './_components/ExtGoogleAnalytics'
import Footer from './_components/Footer'
import { getEggspressSettings } from './utils'
import Font from './_components/UserFont'

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
  const variablesSetting = await getEggspressSettings('variables')
  let appearanceSettings = await getEggspressSettings('appearance')
  if (appearanceSettings && appearanceSettings.code && appearanceSettings.code === 'ENOENT') {
    appearanceSettings = {
      colorThemeDarkPrimary: "slate-900",
      colorThemeDarkSecondary: "slate-800",
      colorThemeDarkFooter: "slate-900",
      colorThemeLightPrimary: "gray-100",
      colorThemeLightSecondary: "white",
      colorThemeLightFooter: "gray-100",
    }
  }

  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col duration-200 bg-${appearanceSettings.colorThemeLightSecondary || 'white'} dark:bg-${appearanceSettings.colorThemeDarkSecondary || 'slate-800'} overflow-x-hidden min-h-screen justify-between`}>
        {process.env.NODE_ENV === 'production' && variablesSetting.googleAnalyticsPropertyId &&
          <ExtGoogleAnalytics></ExtGoogleAnalytics>
        }
        <Navigation />
        <div className={`mb-auto bg-${appearanceSettings.colorThemeLightSecondary} dark:bg-${appearanceSettings.colorThemeDarkSecondary}`}>
          <div className={`px-4 xs:px-0 container mb-12 grow bleed-bg bleed-${appearanceSettings.colorThemeLightSecondary} dark:bleed-${appearanceSettings.colorThemeDarkSecondary}`}>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}

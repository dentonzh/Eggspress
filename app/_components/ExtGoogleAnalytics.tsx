import React from 'react'
import { getEggspressSettings } from '../utils'
import Script from 'next/script'

const ExtGoogleAnalytics = async () => {
  const variables = await getEggspressSettings('variables')
  const propertyId = variables.googleAnalyticsPropertyId

  return (
    <>
      <Script strategy="lazyOnload" async src={`https://www.googletagmanager.com/gtag/js?id=${propertyId}`}></Script>
      <Script strategy="lazyOnload" id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || []
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date())
            gtag('config', '${propertyId}')
            `
        }}
      ></Script>
    </>
  )
}

export default ExtGoogleAnalytics
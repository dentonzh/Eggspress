// @ts-nocheck
'use client'
import { track } from '@minimal-analytics/ga4'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Analytics = ({ propertyId }: { propertyId: string }) => {
  const pathname = usePathname()

  useEffect(() => {
    let currentPathname = ''

    if (pathname !== currentPathname) {
      currentPathname = pathname
      track(propertyId)
    }
  })

  return <></>
}

export default Analytics

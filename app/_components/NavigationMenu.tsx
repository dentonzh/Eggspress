import { ReactNode, useEffect, useRef, useState } from 'react'
import { getEggspressSettings } from '../utils'


type NavigationMenuProps = {
  children: ReactNode
}

const NavigationMenu = async ({children}: NavigationMenuProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className="relative">
      <div className={`rounded-lg bg-opacity-50 ${appearanceSettings.colorNavMenuShadowLight ? 'bg-' + appearanceSettings.colorNavMenuShadowLight : 'bg-gray-500'} ${appearanceSettings.colorNavMenuShadowDark ? 'dark:bg-' + appearanceSettings.colorNavMenuShadowDark : 'dark:bg-gray-500'}`}>
        <div className={`rounded-lg text-gray-800 dark:text-gray-200 relative -top-1 -right-1 -left-1 -bottom-1 border border-gray-500 ${appearanceSettings.colorNavMenuBackgroundLight ? 'bg-' + appearanceSettings.colorNavMenuBackgroundLight : 'bg-white'} ${appearanceSettings.colorNavMenuBackgroundDark ? 'dark:bg-' + appearanceSettings.colorNavMenuBackgroundDark : 'dark:bg-slate-800'}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu
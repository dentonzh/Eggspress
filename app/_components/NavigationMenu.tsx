import { ReactNode, useEffect, useRef, useState } from 'react'
import { getEggspressSettings } from '../utils'


type NavigationMenuProps = {
  children: ReactNode
}

const NavigationMenu = async ({children}: NavigationMenuProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className={`font-medium ${appearanceSettings.colorNavMenuTextDark ? `dark:text-${appearanceSettings.colorNavMenuTextDark}` : 'dark:text-gray-200'} ${appearanceSettings.colorNavMenuTextLight ? `text-${appearanceSettings.colorNavMenuTextLight}` : 'text-gray-800'}`}>
      <div className={`rounded-lg bg-opacity-50 ${appearanceSettings.colorNavMenuShadowLight ? 'bg-' + appearanceSettings.colorNavMenuShadowLight : 'bg-gray-500'} ${appearanceSettings.colorNavMenuShadowDark ? 'dark:bg-' + appearanceSettings.colorNavMenuShadowDark : 'dark:bg-gray-500'}`}>
        <div className={`rounded-lg relative -top-1 -right-1 -left-1 -bottom-1 border border-gray-500 ${appearanceSettings.colorNavMenuBackgroundLight ? 'bg-' + appearanceSettings.colorNavMenuBackgroundLight : 'bg-white'} ${appearanceSettings.colorNavMenuBackgroundDark ? 'dark:bg-' + appearanceSettings.colorNavMenuBackgroundDark : 'dark:bg-slate-800'}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu
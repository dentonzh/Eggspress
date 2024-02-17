import { ReactNode } from 'react'
import { getColors } from '../utils'

type NavigationMenuProps = {
  children: ReactNode
}

const NavigationMenu = async ({ children }: NavigationMenuProps) => {
  return (
    <div className={`font-medium ${await getColors('text', 'NavMenuText', 'gray-200', 'gray-800')}`}>
      <div className={`rounded-lg ${await getColors('bg', 'NavMenuBackgroundShadow', 'gray-600', 'gray-300')}`}>
        <div
          className={`rounded-lg relative -top-1 -right-1 -left-1 -bottom-1 border border-gray-500 ${await getColors('bg', 'NavMenuBackground', 'slate-800', 'white')}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu

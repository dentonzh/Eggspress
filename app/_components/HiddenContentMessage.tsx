import React from 'react'
import { getEggspressSettings } from '../utils'

const HiddenContentMessage = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className="w-full">
      {appearanceSettings.hiddenContentMessage && 
        <div className="bg-yellow-300 text-yellow-700 mb-6 w-full text-center p-2 rounded border border-yellow-500" >
          {appearanceSettings.hiddenContentMessage}
        </div>
      }
    </div>
  )
}

export default HiddenContentMessage
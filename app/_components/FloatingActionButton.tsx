import Image from 'next/image'
import React from 'react'

interface FloatingActionButtonProps {
  icon?: string // name of file located at public/assets/
  text?: string
  hidden?: boolean
  colorClasses?: string
  onClick?: React.MouseEventHandler
}

const FloatingActionButton = ({ icon, text, hidden, colorClasses, onClick }: FloatingActionButtonProps) => {
  return (
    <div
      className={`lg:hidden fixed right-6 duration-400 delay-200 z-10 ${hidden ? '-bottom-20' : 'bottom-8'}`}
      onClick={onClick}
    >
      <div
        className={`${text ? 'pl-4 pr-6' : 'w-14'} ${hidden ? 'opacity-0' : 'opacity-100'} ${colorClasses ? colorClasses : 'bg-slate-500 text-gray-100'} h-14 duration-200 flex items-center justify-center rounded-full drop-shadow-lg shadow-xl hover:drop-shadow-lg hover:shadow-lg`}
      >
        {icon && (
          <Image
            alt="floating action button"
            className="invert opacity-90"
            src={`/assets/icons/${icon}`}
            height="28"
            width="28"
          ></Image>
        )}
        {text && <div className="pl-2">{text}</div>}
      </div>
    </div>
  )
}

export default FloatingActionButton

import Image from 'next/image'
import React from 'react'

interface FloatingActionButtonProps {
  icon?: string, // name of file located at public/assets/
  text?: string,
  hidden?: boolean,
  onClick?: React.MouseEventHandler
}

const FloatingActionButton = ({icon, text, hidden, onClick}: FloatingActionButtonProps)=> {
  return (
    <div className={`md:hidden fixed right-6 duration-400 delay-200 ${hidden ? '-bottom-20' : 'bottom-8'}`} onClick={onClick}>
      <div className={`${text ? 'pl-4 pr-6' : 'w-14'} ${hidden ? 'opacity-0' : 'opacity-100'} h-14 duration-200 flex items-center justify-center rounded-full bg-orange-400 drop-shadow-md shadow-xl hover:drop-shadow-md hover:shadow-md`}>
        {icon &&
          <Image alt="floating action button" className="invert dark:invert-0 opacity-90" src={`/assets/icons/${icon}`} height="28" width="28"></Image>
        }
        {text &&
          <div className="text-gray-200 pl-2">{text}</div>
        }
      </div>
    </div>
  )
}

export default FloatingActionButton
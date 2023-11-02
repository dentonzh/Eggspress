import React, { ReactNode } from 'react'

type SidebarProps = {
  children: ReactNode
}

const Sidebar = ({children}: SidebarProps) => {
  return (
    <div className='hidden lg:block sticky top-24 max-w-md max-h-screen pl-8'>
      <div className='rounded-lg border-2 p-3 w-full'>
        {children}
      </div>
    </div>
  )
}

export default Sidebar
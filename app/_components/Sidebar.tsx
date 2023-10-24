import React, { ReactNode } from 'react'

type SidebarProps = {
  children: ReactNode
}

const Sidebar = ({children}: SidebarProps) => {
  return (
    <div className='hidden xl:flex sticky top-0 max-h-screen grow py-12 px-6'>
      <div className='rounded-lg border-2 p-3 w-full'>
        {children}
      </div>
    </div>
  )
}

export default Sidebar
import React, { ReactNode } from 'react'

type SidebarProps = {
  children: ReactNode,
  isSticky?: boolean | null
}

const Sidebar = ({children, isSticky=null}: SidebarProps) => {
  return (
    <div className={`${isSticky === false ? '' : 'sticky top-24'} hidden lg:block max-w-sm max-h-[50vh] pl-10`}>
      <div className='pl-3 w-full'>
        {children}
      </div>
    </div>
  )
}

export default Sidebar
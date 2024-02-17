import { ReactNode } from 'react'

type SidebarProps = {
  children: ReactNode
  isSticky?: boolean
}

const Sidebar = ({ children, isSticky }: SidebarProps) => {
  return (
    <div className={`${isSticky === false ? '' : 'sticky top-24'} w-full hidden lg:block max-w-sm pl-8 xl:pl-16`}>
      <div className="pl-6 lg:pl-3 w-full">{children}</div>
    </div>
  )
}

export default Sidebar

import React from 'react'

interface EggspressTableProps {
  children: React.ReactNode
}

const EggspressTable: React.FC<EggspressTableProps> = async ({ children }: EggspressTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default EggspressTable

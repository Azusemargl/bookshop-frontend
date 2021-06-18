import React from 'react'
import './sidebar.scss'

const Sidebar: React.FC = React.memo(({ children }) => {
   return (
      <div className="sidebar">{children}</div>
   )
})

export default Sidebar

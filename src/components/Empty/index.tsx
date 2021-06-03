import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import './empty.scss'

const Empty: React.FC<Props> = React.memo(({ title }) => {
   return (
      <div className="empty">
         <InboxOutlined />
         <p>{title}</p>
      </div>
   )
})

export default Empty

// Types
type Props = {
   title: string
}

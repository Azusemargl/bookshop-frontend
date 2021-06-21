import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import './spiner.scss'

const Spiner: React.FC = React.memo(() => {
   return (
      <div className="spiner">
         <LoadingOutlined />
      </div>
   )
})

export default Spiner

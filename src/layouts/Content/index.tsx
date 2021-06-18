import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import './content.scss'

const Content: React.FC<Props> = React.memo(({ title, children }) => {
   const { isLoading } = useSelector((state: AppState) => state.app)

   return (
      <div className="content">
         {isLoading ? (
            <div className="content__loading"><LoadingOutlined /></div>
         ) : (
            <div className="content__inner">
               <div className="content__header">
                  <h1 className="content__title">{title}</h1>
                  <div className="content__link">
                     <LeftOutlined />
                     <Link to={`/`}>Вернуться к покупкам</Link>
                  </div>
               </div>
               {children}
            </div>
         )}
      </div>
   )
})

export default Content

// Types
type Props = {
   title: string
}

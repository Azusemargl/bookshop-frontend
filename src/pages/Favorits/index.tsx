import React from 'react'
import { Empty } from '../../components'
import './favorits.scss'

const Favorits: React.FC = React.memo(() => {
   const [auth, setAuth] = React.useState(false)

   return (
      <>
         {auth ? (
            <div className="favorits">
               
            </div>
         ) : (
            <Empty title="Нет избранных книг" />
         )}
      </>
   )
})

export default Favorits

import React from 'react'
import { Link } from 'react-router-dom'
import './story.scss'

const Stories: React.FC<Props> = React.memo(({ id, name, link}) => {
   return (
      <>
         <div className="story">
            <Link to={`catalog/${link}`} className="story__image">
               <img src={`/images/stories/${id}.jpg`} alt={name} />
            </Link>
         </div>
      </>
   )
})

export default Stories

// Types
type Props = {
   id: number
   name: string
   link: string
}

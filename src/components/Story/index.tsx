import React from 'react'
import { Link } from 'react-router-dom'
import './story.scss'

const Stories: React.FC<Props> = React.memo(({ id, name, image, link}) => {
   return (
      <>
         <div className="story">
            <Link to={`/${link}`} className="story__image">
               <img src={image} alt={name} />
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
   image: string
   link: string
}

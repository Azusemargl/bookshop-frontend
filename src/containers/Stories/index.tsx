import React from 'react'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { stories_slider } from '../../utils/sliders/settings'
import { Story } from '../../components'
import './stories.scss'

const Stories: React.FC = React.memo(() => {
   const stories = useSelector((state: AppState) => state.stories.stories)
   
   return (
      <div className="stories">
         <Slider {...stories_slider}>
            {stories.map(story => (
               <Story key={story.id} id={story.id} name={story.name} image={story.image} link={story.link} />
            ))}
         </Slider>
      </div>
   )
})

export default Stories

import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { DownOutlined, EnvironmentOutlined, UpOutlined } from '@ant-design/icons'
import './topBar.scss'

const TopBar: React.FC<Props> = React.memo(({ cities }) => {
   const [city, setCity] = React.useState(cities[0]) // Select current city
   const [showCity, setShowCity] = React.useState(false) // City visibility toggle 

   const selectorRef = React.useRef<HTMLButtonElement>(null)

   // Hide the city selector window after click
   const handleOutsideClick = React.useCallback((e: MouseEvent) => {
      const path = e.composedPath()
      if (selectorRef.current !== null && !path.includes(selectorRef.current)) setShowCity(false)
      document.removeEventListener('click', handleOutsideClick)
   }, [])

   // Add listener for window clicks
   React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick)
   }, [showCity, handleOutsideClick])

   const onCitySelect = (currentCity: string) => {
      setCity(currentCity)
      setShowCity(false)
   }

   return (
      <div className="top-bar">
         <div className="container">
            <div className="top-bar__inner">
               <div className="top-bar__catalog">
                  <button className="top-bar__btn" onClick={e => setShowCity(!showCity)} ref={selectorRef}>
                     <EnvironmentOutlined />
                     <p>{city}</p>
                     {showCity ? <UpOutlined /> : <DownOutlined />}
                  </button>
               </div>
               <Link className="top-bar__link" to="/promotions">Акции</Link>
            </div>
         </div>
         {showCity &&
            <div className="city-selector">
               <div className="container">
                  <ul className="city-selector__list">
                     {cities.map((currentCity, index) => (
                        <li
                           className={classnames("city-selector__item", {})}
                           key={`${index}-${currentCity}`}
                           onClick={e => onCitySelect(currentCity)
                           }>
                           <p>{currentCity}</p>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         }
      </div>
   )
})

export default TopBar

// Types
type Props = {
   cities: Array<string>
}

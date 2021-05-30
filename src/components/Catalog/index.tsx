import React from 'react'
import { Link } from 'react-router-dom'
import { BookOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import './catalog.scss'

const Catalog: React.FC = () => {
   const categories = ['Компьютерная литература', 'Научная литература']

   const [catalogShow, setCatalogShow] = React.useState(false)

   const catalogRef = React.useRef<HTMLButtonElement>(null)

   // Hide the catalog window after click
   const handleOutsideClick = React.useCallback((e: MouseEvent) => {
      const path = e.composedPath()
      if (catalogRef.current !== null && !path.includes(catalogRef.current)) setCatalogShow(false)
      document.removeEventListener('click', handleOutsideClick)
   }, [])

   // Add listener for window clicks
   React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick)
   }, [catalogShow, handleOutsideClick])

   return (
      <div className="catalog__container">
         <button className="catalog__btn" onClick={e => setCatalogShow(!catalogShow)} ref={catalogRef}>
            {catalogShow ? <CloseOutlined /> : <MenuOutlined />}
            <p>Каталог</p>
         </button>
         {catalogShow && (
            <ul className="catalog">
               {categories.map((category, index) => (
                  <li className="catalog__item" key={`${index}-${category}`}>
                     <Link className="catalog__link" to="/"><BookOutlined />{category}</Link>
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default Catalog

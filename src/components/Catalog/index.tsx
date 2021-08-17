import React from 'react'
import { useHistory } from 'react-router-dom'
import { AppState } from '../../store/store'
import { BookOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import './catalog.scss'
import { fetchFilterBooks } from '../../store/reducers/filterReducer'

const Catalog: React.FC = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   // const categories = ['Компьютерная литература', 'Научная литература']
   const books = useSelector((state: AppState) => state.books.items)
   const [categories, setCategories] = React.useState<Array<string>>([])

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

   // Books category push to catalog
   React.useEffect(() => {
      books.length && setCategories([...new Set(books.map(item => item.category))])
   }, [books])

   const onFilterChange = (category: string) => {
      onCategoryPush(category)
      dispatch(fetchFilterBooks({ "genres": category, "authors": "" }))
   }

   const onCategoryPush = (category: string) => {
      history.push({
         "pathname": "/catalog",
         "search": `?genres=${category}`
      })
   }

   return (
      <div className="catalog__container">
         <button className="catalog__btn" onClick={() => setCatalogShow(!catalogShow)} ref={catalogRef}>
            {catalogShow ? <CloseOutlined /> : <MenuOutlined />}
            <p>Каталог</p>
         </button>
         {catalogShow && (
            <ul className="catalog">
               {categories.map((category, index) => (
                  <li className="catalog__item" key={`${index}-${category}`}>
                     <p className="catalog__link" onClick={() => onFilterChange(category)}><BookOutlined />{category}</p>
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default Catalog

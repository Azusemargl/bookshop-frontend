import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import FilterBlock from './FilterBlock'
import { fetchFilterBooks } from '../../store/reducers/filterReducer'
import { AppState } from '../../store/store'
import { FilterTypes } from '../../types/filterTypes'
import { RedoOutlined } from '@ant-design/icons'
import './filter.scss'

const Filter: React.FC = React.memo(() => {
   const history = useHistory()
   const dispatch = useDispatch()

   const booksState = useSelector((state: AppState) => state.books.items)
   const filter = useSelector((state: AppState) => state.filter.filter)

   // Categories
   const books = [...new Set(booksState.map(book => book.category).sort())] // Output unique categories
   const authors = [...new Set(booksState.map(book => book.author).sort())] // Output unique authors

   // Get URI data for the following parsing
   const uri = decodeURIComponent(history.location.search)
   const uriObj = queryString.parse(uri) as FilterTypes

   // Find the max and min value of books prices
   const minValue = Math.min(...booksState.map(item => item.price))
   const maxValue = Math.max(...booksState.map(item => item.price))

   // Filters
   const [genresFilter, setGenresFilter] = React.useState<Array<string>>(uriObj.genres?.split(',') || [])
   const [authorsFilter, setAuthorsFilter] = React.useState<Array<string>>(uriObj.authors?.split(',') || [])
   const [minPrice, setMinPrice] = React.useState<number | string>(isFinite(minValue) ? '' : 0)
   const [maxPrice, setMaxPrice] = React.useState<number | string>(isFinite(maxValue) ? '' : 0)

   // URI data parsing function
   const filterOnChange = (currentFilter: FilterTypes) => {
      const parsed = queryString.parse(history.location.search) as FilterTypes
      let actualFilter = currentFilter

      if (parsed) actualFilter = { ...parsed }

      actualFilter && dispatch(fetchFilterBooks(actualFilter))
   }

   const onFilterRestart = () => {
      history.push({
         pathname: '/catalog',
         search: ('')
      })

      setGenresFilter([])
      setAuthorsFilter([])
      setMinPrice(minValue)
      setMaxPrice(maxValue)
   }

   const onPriceChange = (value: number, setter: (value: number | string) => void) => {
      const price = +value
      if (price <= 0) setter('')
      else setter(+price)
   }

   const removeEmptyElements = (arr: Array<string>) => {
      return arr.filter(item => item.length)
   }

   // Set filter state during URI changing
   React.useEffect(() => {
      filterOnChange(filter)
   }, [history.location.search])

   // Update filter state during filter item toggle
   React.useEffect(() => {
      if (genresFilter?.length || authorsFilter?.length || minPrice || maxPrice) {

         // Remove empty array elements
         const category = removeEmptyElements(genresFilter)
         const author = removeEmptyElements(authorsFilter)

         history.push({
            pathname: '/catalog',
            search: (
               `?${!!genresFilter.length ? `genres=${category}&` : ''}` +
               `${!!authorsFilter.length ? `authors=${author}&` : ''}` +
               `${minPrice ? `minPrice=${minPrice}&` : ''}` +
               `${maxPrice ? `maxPrice=${maxPrice}` : ''}`
            )
         })

         filterOnChange(filter)
      }
   }, [genresFilter, authorsFilter, minPrice, maxPrice])

   React.useEffect(() => {
      if (isFinite(minValue)) setMinPrice(minValue)
      if (isFinite(maxValue)) setMaxPrice(maxValue)
   }, [minValue, maxValue])

   return (
      <div className="filter">

         <div className="filter__header">
            <h5>Фильтр:</h5>
            <button className="filter__restart" onClick={e => onFilterRestart()}>
               <RedoOutlined />
               <p>Сбросить</p>
            </button>
         </div>

         <div className="filter__item">
            <h6>Жанры:</h6>
            <FilterBlock category={books} filter={genresFilter} setFilter={setGenresFilter} />
         </div>

         <div className="filter__item">
            <h6>Авторы:</h6>
            <FilterBlock category={authors} filter={authorsFilter} type="search" setFilter={setAuthorsFilter} />
         </div>

         <div className="filter__item">
            <h6>Цена:</h6>
            <div className="filter__prices">
               <input type="number" value={minPrice} onChange={e => onPriceChange(+e.target.value, setMinPrice)} />
               <input type="number" value={maxPrice} onChange={e => onPriceChange(+e.target.value, setMaxPrice)} />
            </div>
         </div>

      </div>
   )
})

export default Filter
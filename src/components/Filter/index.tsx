import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import FilterBlock from './FilterBlock'
import { fetchFilterBooks } from '../../store/reducers/filterReducer'
import { AppState } from '../../store/store'
import { FilterTypes } from '../../types/filterTypes'
import './filter.scss'

const Filter: React.FC = React.memo(() => {
   const history = useHistory()
   const dispatch = useDispatch()

   const booksState = useSelector((state: AppState) => state.books.items)
   const filter = useSelector((state: AppState) => state.filter.filter)

   // Categories
   const books = [... new Set(booksState.map(book => book.category))] // Output unique categories
   const authors = [... new Set(booksState.map(book => book.author))] // Output unique authors

   // Get URI data for the following parsing
   const uri = decodeURIComponent(history.location.search)
   const uriObj = queryString.parse(uri) as FilterTypes

   // Filters
   const [genresFilter, setGenresFilter] = React.useState<Array<string>>(uriObj.genres?.split(',') || [])
   const [authorsFilter, setAuthorsFilter] = React.useState<Array<string>>(uriObj.authors?.split(',') || [])
   const [minPrice, setMinPrice] = React.useState<number | null>()
   const [maxPrice, setMaxPrice] = React.useState<number | null>()

   // URI data parsing function
   const filterOnChange = (currentFilter: FilterTypes) => {
      const parsed = queryString.parse(history.location.search) as FilterTypes
      let actualFilter = currentFilter

      if (parsed) actualFilter = { ...parsed }

      actualFilter && dispatch(fetchFilterBooks(actualFilter)) 
   }

   // Set filter state during URI changing
   React.useEffect(() => {
      filterOnChange(filter)
   }, [history.location.search])

   // Update filter state during filter item toggle
   React.useEffect(() => {
      if (genresFilter?.length || authorsFilter?.length || minPrice || maxPrice) {
         history.push({
            pathname: '/catalog',
            search: (
               `?${genresFilter.length ? `genres=${genresFilter}&` : ''}` +
               `${authorsFilter.length ? `authors=${authorsFilter}&` : ''}` +
               `${minPrice ? `minPrice=${minPrice}&` : ''}` +
               `${maxPrice ? `maxPrice=${maxPrice}` : ''}`
            )
         })
         
         filterOnChange(filter)
      }
   }, [genresFilter, authorsFilter, minPrice, maxPrice])
   
   return (
      <div className="filter">
         <FilterBlock title="Жанры" category={books} filter={genresFilter} setFilter={setGenresFilter} />
         <FilterBlock title="Авторы" category={authors} filter={authorsFilter} setFilter={setAuthorsFilter} />
         <div className="filter__prices">
            <input type="number" value={minPrice || ''} onChange={e => setMinPrice(+e.target.value)} />
            <input type="number" value={maxPrice || ''} onChange={e => setMaxPrice(+e.target.value)} />
         </div>
      </div>
   )
})

export default Filter
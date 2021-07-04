import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import FilterBlock from './FilterBlock'
import { fetchFilterBooks } from '../../store/reducers/filterReducer'
import { AppState } from '../../store/store'
import { FilterTypes } from '../../types/filterTypes'
import './filter.scss'

const Filter = () => {
   const history = useHistory()
   const dispatch = useDispatch()

   const booksState = useSelector((state: AppState) => state.books.items)
   const filter = useSelector((state: AppState) => state.filter.filter)

   // Categories
   const books = [... new Set(booksState.map(book => book.category))] // Output unique categories
   const authors = [... new Set(booksState.map(book => book.author))] // Output unique authors

   // Filters
   const [genresFilter, setGenresFilter] = React.useState<Array<string>>([])
   const [authorsFilter, setAuthorsFilter] = React.useState<Array<string>>([])

   // Query dispatch
   React.useEffect(() => {
      const parsed = queryString.parse(history.location.search) as FilterTypes

      let actualFilter = filter

      if(parsed) actualFilter = {...parsed}

      actualFilter && dispatch(fetchFilterBooks(actualFilter))
   }, [history.location.search])

   // URI change
   React.useEffect(() => {
      history.push({
         pathname: 'catalog',
         search: `?genres=${genresFilter}&authors=${authorsFilter}`
      })
   }, [genresFilter, authorsFilter])

   return (
      <div className="filter">
         <FilterBlock title="Жанры" category={books} filter={genresFilter} setFilter={setGenresFilter} />
         <FilterBlock title="Авторы" category={authors} filter={authorsFilter} setFilter={setAuthorsFilter} />
      </div>
   )
}

export default Filter

// Types
type FilterBlockProps = {
   title: string
   category: Array<string>
   filter: Array<string>
   setFilter: (value: Array<string>) => void
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import queryString from 'query-string'
import { Products } from '../../containers'
import { Empty } from '../../components'
import { AppState } from '../../store/store'
import { fetchSearchRequest } from '../../store/reducers/filterReducer'
import { SearchTypes } from '../../types/filterTypes'
import './search.scss'

const Search: React.FC = React.memo(() => {
   const history = useHistory()
   const dispatch = useDispatch()
   const search = useSelector((state: AppState) => state.filter.search)
   const books = useSelector((state: AppState) => state.filter.books)

   const filterOnChange = (currentFilter: SearchTypes) => {
      const parsed = queryString.parse(history.location.search) as SearchTypes
      let actualFilter = currentFilter

      if (parsed) actualFilter = { ...parsed }

      actualFilter && dispatch(fetchSearchRequest(actualFilter))
   }

   React.useEffect(() => {
      filterOnChange(search)
   }, [history.location.search])

   return (
      <div className="search_page" style={{ justifyContent: books.length ? "flex-start" : "center" }}>
         {books.length
            ? <Products books={books} />
            : <Empty title="Ничего не найдено" />
         }
      </div>
   )
})

export default Search
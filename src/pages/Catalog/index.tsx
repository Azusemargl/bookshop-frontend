import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Products } from '../../containers'
import { Filter } from '../../components'
import './catalog.scss'
import { fetchBooks } from '../../store/reducers/bookReducer'

// TODO: filter by category

const Catalog: React.FC = React.memo(() => {
   const dispatch = useDispatch()
   const books = useSelector((state: AppState) => state.books.items)

   const [filter, setFilter] = React.useState(books)
   const [value, setValue] = React.useState('')

   React.useEffect(() => {
      dispatch(fetchBooks())
   }, [])
   
   React.useEffect(() => {
      setFilter(books.filter(book => book.name.toLowerCase().indexOf(value.toLowerCase()) >= 0))
   }, [books])

   return (
      <div className="books-catalog">
         <div className="books-catalog__products">
            <Products books={filter} />
         </div>
         <Filter />
      </div>
   )
})

export default Catalog

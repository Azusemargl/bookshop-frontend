import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Products } from '../../containers'
import { Filter } from '../../components'
import { Sidebar } from '../../layouts'
import './catalog.scss'

// TODO: filter by category

const Catalog: React.FC = React.memo(() => {
   const books = useSelector((state: AppState) => state.books.items)

   const [filter, setFilter] = React.useState(books)
   const [value, setValue] = React.useState('')

   React.useEffect(() => {
      setFilter(books.filter(book => book.name.toLowerCase().indexOf(value.toLowerCase()) >= 0))
   }, [books])

   return (
      <Sidebar>
         <div className="books-catalog__products">
            <Products books={filter} />
         </div>
         <Filter />
      </Sidebar>
   )
})

export default Catalog

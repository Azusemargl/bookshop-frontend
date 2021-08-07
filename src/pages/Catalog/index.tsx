import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Products } from '../../containers'
import { Empty, Filter, Spiner } from '../../components'
import { Sidebar } from '../../layouts'
import './catalog.scss'

// TODO: filter by category

const Catalog: React.FC = React.memo(() => {
   const isLoading = useSelector((state: AppState) => state.app.isLoading)
   const books = useSelector((state: AppState) => state.filter.books)

   const [filter, setFilter] = React.useState(books)
   const [value, setValue] = React.useState('')

   React.useEffect(() => {
      setFilter(books?.filter(book => book.name.toLowerCase().indexOf(value.toLowerCase()) >= 0))
   }, [books])

   return (
      <Sidebar>
         <div className="books-catalog__products" style={{ justifyContent: `${filter.length ? '' : 'center'}` }}>
            {isLoading && filter.length
               ? <Spiner />
               : <Products books={filter} />
            }
            {!filter.length && <Empty title="Пусто" />}
         </div>
         <Filter />
      </Sidebar>
   )
})

export default Catalog

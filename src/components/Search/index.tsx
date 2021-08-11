import React from 'react'
import { useHistory } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import './search.scss'

const Search: React.FC = React.memo(() => {
   const history = useHistory()
   
   const search = useSelector((state: AppState) => state.filter.search.value)

   const [value, setValue] = React.useState(search || '')
   
   const onSearch = (value: string, event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault()

      history.push({
         pathname: '/search',
         search: (`?value=${value}`)
      })
   }

   React.useEffect(() => {
      search && setValue(search)
   }, [search])

   return (
      <form className="search" onSubmit={e => onSearch(value, e)}>
         <input
            type="text"
            value={value}
            className="search__filed"
            placeholder="Поиск книг, авторов"
            onChange={e => setValue(e.target.value)}
         />
         <button className="search__icon" onClick={() => onSearch(value)}><SearchOutlined /></button>
      </form>
   )
})

export default Search
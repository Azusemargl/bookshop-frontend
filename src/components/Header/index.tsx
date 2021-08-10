import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Auth } from '../../containers'
import Catalog from '../Catalog'
import { HeaderButtons } from './HeaderButtons'
import './header.scss'

const Header: React.FC<Props> = React.memo(({ removeCookie }) => {
   const history = useHistory()
   const { auth, login } = useSelector((state: AppState) => state.user)
   const booksState = useSelector((state: AppState) => state.books.items)

   const namesData = [... new Set(booksState.map(book => book.name))]
   const authorsData = [... new Set(booksState.map(book => book.author))]
   const [showAuth, setShowAuth] = React.useState(false) // auth window state
   const [value, setValue] = React.useState('') // auth window state

   // Open an auth window
   const onAuthOpen = React.useCallback(() => {
      document.body.classList.add('modal-open')
      setShowAuth(true)
   }, [setShowAuth])

   const compareValue = (arr: Array<string>, data: string) => {
      return arr.filter(item => item.toLowerCase().includes(data.toLowerCase()))
   }

   const onSearch = (event: React.FormEvent<HTMLFormElement>, value: string) => {
      event.preventDefault()

      const names = compareValue(namesData, value)
      const authors = compareValue(authorsData, value)

      history.push({
         pathname: '/catalog',
         search: (
            `${!!authors.length ? `authors=${authors}&` : ''}`
         )
      })
   }

   return (
      <header className="header">
         <div className="container">
            <div className="header__inner">
               <div className="header__block">
                  <Link className="header__logo" to="/">BookShop</Link>
                  <Catalog />
               </div>
               <form className="header__search" onSubmit={e => onSearch(e, value)}>
                  <input
                     type="text"
                     className="header__search-filed"
                     placeholder="Поиск книг, авторов"
                     onChange={e => setValue(e.target.value)}
                  />
                  <button className="header__search-icon"><SearchOutlined /></button>
               </form>
               <div className="header__buttons">
                  {auth ? (
                     <HeaderButtons login={login} setShowAuth={setShowAuth} removeCookie={removeCookie} />
                  ) : (
                     <div className="header__link-container">
                        <button className="header__icon" onClick={onAuthOpen}>
                           <UserOutlined />
                           <p>Войти</p>
                        </button>
                        <Auth setShowAuth={setShowAuth} showAuth={showAuth} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   )
})

export default Header

// Types
type Props = {
   removeCookie: (name: string, options?: any) => void
}

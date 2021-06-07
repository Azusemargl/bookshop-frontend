import React from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Auth } from '../../containers'
import Catalog from '../Catalog'
import { HeaderButtons } from './HeaderButtons'
import './header.scss'

const Header: React.FC<Props> = React.memo(({ removeCookie }) => {
   const { auth, login } = useSelector((state: AppState) => state.auth)

   const [showAuth, setShowAuth] = React.useState(false) // auth window state

   // Open an auth window
   const onAuthOpen = React.useCallback(() => {
      document.body.classList.add('modal-open')
      setShowAuth(true)
   }, [setShowAuth])

   return (
      <header className="header">
         <div className="container">
            <div className="header__inner">
               <div className="header__block">
                  <Link className="header__logo" to="/">BookShop</Link>
                  <Catalog />
               </div>
               <div className="header__search">
                  <input type="text" className="header__search-filed" placeholder="Поиск книг, авторов" />
                  <button className="header__search-icon"><SearchOutlined /></button>
               </div>
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

import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Auth } from '../../containers'
import Catalog from '../Catalog'
import { Search } from '..'
import { HeaderButtons } from './HeaderButtons'
import './header.scss'

const Header: React.FC<Props> = React.memo(({ removeCookie }) => {
   const { isAuthForm } = useSelector((state: AppState) => state.app)
   const { auth, login } = useSelector((state: AppState) => state.user)

   const [showAuth, setShowAuth] = React.useState(false) // auth window state

   // Open an auth window
   const onAuthOpen = React.useCallback(() => {
      document.body.classList.add('modal-open')
      setShowAuth(true)
   }, [setShowAuth])

   // Set form boolean value
   React.useEffect(() => {
      setShowAuth(isAuthForm)
   }, [isAuthForm])

   return (
      <header className="header">
         <div className="container">
            <div className="header__inner">
               <div className="header__block">
                  <Link className="header__logo" to="/">BookShop</Link>
                  <Catalog />
               </div>
               <Search />
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

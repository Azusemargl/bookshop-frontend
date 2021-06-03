import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SearchOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'
import Catalog from '../Catalog'
import './header.scss'
import { Auth } from '../../containers'

const Header: React.FC = React.memo(() => {
   const auth = true

   const [showAuth, setShowAuth] = React.useState(false)

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
                  {auth ? (<>
                     <div className="header__icon counter finance">
                        <span>1000</span>
                        <p>Рублей</p>
                     </div>
                     <div className="header__icon counter scores">
                        <span>0</span>
                        <p>Баллов</p>
                     </div>
                     <NavLink to="/favorits" className="header__icon" activeClassName="active">
                        <HeartOutlined />
                        <p>Избранное</p>
                     </NavLink>
                     <NavLink to="/cart" className="header__icon" activeClassName="active">
                        <ShoppingCartOutlined />
                        <p>Корзина</p>
                     </NavLink>
                     <div className="header__icon">
                        <button className="header__icon">
                           <UserOutlined />
                           <p>Name</p>
                        </button>
                     </div>
                  </>) : (
                     <div className="link-container">
                        <button className="header__icon" onClick={onAuthOpen}>
                           <UserOutlined />
                           <p>Войти</p>
                        </button>
                        <Auth showAuth={showAuth} setShowAuth={setShowAuth} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   )
})

export default Header

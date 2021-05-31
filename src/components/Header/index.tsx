import React from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'
import Catalog from '../Catalog'
import './header.scss'

const Header: React.FC<Props> = ({ onAuth }) => {
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
                  <button className="header__icon"><HeartOutlined /><p>Избранное</p></button>
                  <button className="header__icon"><ShoppingCartOutlined /><p>Корзина</p></button>
                  <button className="header__icon" onClick={e => onAuth(true)}><UserOutlined /><p>Войти</p></button>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header

// Types
type Props = {
   onAuth: (value: boolean) => void
}

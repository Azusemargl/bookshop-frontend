import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeOutlined, BookOutlined } from '@ant-design/icons'
import './sidemenu.scss'

const Sidemenu = () => {
   return (
      <ul className="sidemenu">
         <li className="sidemenu__element">
            <NavLink exact to="/" className="sidemenu__item" activeClassName="active" >
               <HomeOutlined />
               <p className="sidemenu__link">Главная</p>
            </NavLink>
         </li>
         <li className="sidemenu__element">
            <NavLink exact to="/catalog" className="sidemenu__item" activeClassName="active" >
               <BookOutlined />
               <p className="sidemenu__link">Каталог книг</p>
            </NavLink>
         </li>
      </ul>
   )
}

export default Sidemenu

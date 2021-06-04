import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SearchOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Auth } from '../../containers'
import Catalog from '../Catalog'
import './header.scss'
import { logout } from '../../store/reducers/authReducer'

const Header: React.FC = React.memo(() => {
   const dispatch = useDispatch()
   const { auth, login } = useSelector((state: AppState) => state.auth)

   const [showAuth, setShowAuth] = React.useState(false) // auth window state
   const [accountModul, setAccountModul] = React.useState(false) // account modul state

   // Open an auth window
   const onAuthOpen = React.useCallback(() => {
      document.body.classList.add('modal-open')
      setShowAuth(true)
   }, [setShowAuth])

   // Dispatch for remove user data and token cookie
   const onLogout = () => {
      dispatch(logout())
   }

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
                     <div className="header__link-container">
                        <div className="header__icon counter finance">
                           <span>1000</span>
                           <p>Рублей</p>
                        </div>
                     </div>
                     <div className="header__link-container">
                        <div className="header__icon counter scores">
                           <span>0</span>
                           <p>Баллов</p>
                        </div>
                     </div>
                     <div className="header__link-container">
                        <NavLink to="/favorits" className="header__icon" activeClassName="active">
                           <HeartOutlined />
                           <p>Избранное</p>
                        </NavLink>
                     </div>
                     <div className="header__link-container">
                        <NavLink to="/cart" className="header__icon" activeClassName="active">
                           <ShoppingCartOutlined />
                           <p>Корзина</p>
                        </NavLink>
                     </div>
                     <div className="header__link-container" onClick={e => setAccountModul(!accountModul)}>
                        <button className="header__icon">
                           <UserOutlined />
                           <p>{login}</p>
                        </button>
                        {accountModul &&
                           <ul className="header__account-modul">
                              <li>
                                 <Link to="profile">
                                    <SettingOutlined />
                                    <p>Профиль</p>
                                 </Link>
                              </li>
                              <li onClick={e => onLogout()}>
                                 <LogoutOutlined />
                                 <p>Выйти</p>
                              </li>
                           </ul>
                        }
                     </div>
                  </>) : (
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

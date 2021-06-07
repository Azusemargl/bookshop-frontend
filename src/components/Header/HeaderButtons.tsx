import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/reducers/authReducer'
import { ContainerOutlined, HeartOutlined, LogoutOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

export const HeaderButtons: React.FC<Props> = React.memo(({ login, setShowAuth, removeCookie }) => {
   const dispatch = useDispatch()

   const [accountModul, setAccountModul] = React.useState(false) // account module state

   // Dispatch for remove user data and token cookie
   const onLogout = () => {
      setShowAuth(false)
      setAccountModul(false)
      removeCookie('token')
      dispatch(logout())
   }

   const accountModelWrapperRef = React.useRef<HTMLDivElement>(null)
   const accountModelRef = React.useRef<HTMLUListElement>(null)

   // Hide the auth window after click
   const handleOutsideClick = React.useCallback((e: MouseEvent) => {
      if (accountModelRef.current !== null && accountModelWrapperRef.current !== null) {
         const path = e.composedPath()
         if (!path.includes(accountModelRef.current) && !path.includes(accountModelWrapperRef.current)) {
            setAccountModul(false)
            document.removeEventListener('click', handleOutsideClick)
         }
      }
   }, [])

   // Add listener for window clicks
   React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick)
   }, [accountModul, handleOutsideClick])

   return (
      <>
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
         <div className="header__link-container" onClick={e => setAccountModul(!accountModul)} ref={accountModelWrapperRef}>
            <button className="header__icon">
               <UserOutlined />
               <p>{login}</p>
            </button>
         </div>
         {
            accountModul &&
            <ul className="header__account-modul" ref={accountModelRef}>
               <li>
                  <Link to="/profile/info" onClick={e => setAccountModul(false)}>
                     <UserOutlined />
                     <p>Профиль</p>
                  </Link>
               </li>
               <li>
                  <Link to="/profile/settings" onClick={e => setAccountModul(false)}>
                     <SettingOutlined />
                     <p>Настройки</p>
                  </Link>
               </li>
               <li>
                  <Link to="/profile/orders" onClick={e => setAccountModul(false)}>
                     <ContainerOutlined />
                     <p>Заказы</p>
                  </Link>
               </li>
               <li onClick={e => onLogout()}>
                  <LogoutOutlined />
                  <p>Выйти</p>
               </li>
            </ul>
         }
      </>
   )
})

// Types
type Props = {
   login: string | null
   setShowAuth: (value: boolean) => void
   removeCookie: (name: string, options?: any) => void
}


import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actions as appActions } from '../../store/reducers/appReducer'
import { actions as userActions } from '../../store/reducers/userReducer'
import { ContainerOutlined, HeartOutlined, LogoutOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { AppState } from '../../store/store'

export const HeaderButtons: React.FC<Props> = React.memo(({ login, setShowAuth, removeCookie }) => {
   const dispatch = useDispatch()
   const { balance, scores } = useSelector((state: AppState) => state.user)

   const { books } = useSelector((state: AppState) => state.cart) // cart state
   const [accountModul, setAccountModul] = React.useState(false) // account module state

   // Dispatch for remove user data and token cookie
   const onLogout = () => {
      setShowAuth(false)
      setAccountModul(false)

      removeCookie('token')

      dispatch(userActions.logout())
      dispatch(appActions.setAuthForm(false))
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
               <span>{balance}</span>
               <p>Рублей</p>
            </div>
         </div>
         <div className="header__link-container">
            <div className="header__icon counter scores">
               <span>{scores}</span>
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
               {books && books.length >= 1 && <mark className="header__icon-cart_count">{books.length}</mark>}
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


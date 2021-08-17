import React from 'react'
import { NavLink, Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/store'
import { Info } from './ProfileInfo'
import { Settings } from './ProfileSettings'
import { Empty } from '../../components'
import { UserOutlined, SettingOutlined, ContainerOutlined } from '@ant-design/icons'
import './profile.scss'

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = React.memo(({ link, children }) => {
   return (
      <li className="profile__menu-item">
         <NavLink to={`/profile/${link}`} className="profile__menu-link" activeClassName="active">
            {children}
         </NavLink>
      </li>
   )
})

const Orders: React.FC = React.memo(() => {
   const { orders } = useSelector((state: AppState) => state.user)

   return (
      <div className="profile__orders">
         {!orders.some(item => item === null) ? (
            <div className="order">
               <div className="order__books">
                  {orders.map((order, index) => (
                     <div className="order__item" key={index}>
                        <h4>Заказ №{order._id}</h4>
                        <p>Статус: {order.completed ? "завершен" : "в процессе"}</p>
                        <p>Стоимость: {order.price} ₽</p>
                     </div>
                  ))}
               </div>
            </div>
         ) : (
            <Empty title="Нет заказов" />
         )}
      </div>
   )
})

const Profile: React.FC = React.memo(() => {
   const { app, isLoading } = useSelector((state: AppState) => state.auth)
   const { auth } = useSelector((state: AppState) => state.user)

   if (app && !auth && !isLoading) return <Redirect to="/" />

   return (
      <div className="profile">
         <div className="profile__inner">
            <ul className="profile__menu profile__wrapper">
               <ProfileMenuItem link="info">
                  <UserOutlined />
                  <p>Общее</p>
               </ProfileMenuItem>
               <ProfileMenuItem link="settings">
                  <SettingOutlined />
                  <p>Настройки</p>
               </ProfileMenuItem>
               <ProfileMenuItem link="orders">
                  <ContainerOutlined />
                  <p>Заказы</p>
               </ProfileMenuItem>
            </ul>
            <div className="profile__content profile__wrapper">
               <Route exact path="/profile/info" component={Info} />
               <Route exact path="/profile/settings" component={Settings} />
               <Route exact path="/profile/orders" component={Orders} />
            </div>
         </div>
      </div>
   )
})

export default Profile

// Types
type ProfileMenuItemProps = {
   link: string
}

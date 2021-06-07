import React from 'react'
import { NavLink, Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Info } from './ProfileInfo'
import { AppState } from '../../store/store'
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

const Settings: React.FC = React.memo(() => {
   const { login } = useSelector((state: AppState) => state.auth)

   return <p>{login}</p>
})

const Orders: React.FC = React.memo(() => {
   const { orders } = useSelector((state: AppState) => state.auth)

   return (
      <div className="profile__orders"></div>
   )
})

const Profile: React.FC = React.memo(() => {
   const { app, auth, isLoading } = useSelector((state: AppState) => state.auth)

   if (app && !auth && !isLoading) return <Redirect to="/" />

   return (
      <div className="profile">
         <div className="profile__inner">
            <ul className="profile__menu">
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
            <div className="profile__content">
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

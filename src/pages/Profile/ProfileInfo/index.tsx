import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePhoto } from '../../../store/reducers/authReducer'
import { AppState } from '../../../store/store'
import { Diagram } from './diagram'
import { UploadOutlined, UserAddOutlined } from '@ant-design/icons'
import './profileInfo.scss'
import { userAnalysis } from '../../../utils/helpers/userAnalysis'

export const Info: React.FC = React.memo(() => {
   const dispatch = useDispatch()
   const { login, avatar, city, gender, orders, createdAt } = useSelector((state: AppState) => state.auth)

   // Get image file
   const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.files && e.target.files.length && dispatch(savePhoto(e.target.files[0]))
   }

   const categories = userAnalysis.getCategories(orders)
   const orderCounter = userAnalysis.getCategoriesCount(categories, orders)

   return (
      <div className="profile__info">
         <div className="profile__user">
            <div className="profile__image">
               {avatar !== null ? (
                  <img src={avatar} className="profile__image-avatar" alt={`${login}`} />
               ) : (
                  <div className="profile__image-default">
                     <UserAddOutlined />
                     <label htmlFor="avatar-select" />
                     <input hidden id="avatar-select" type="file" onChange={onFileUpload} />
                     <div className="profile__image-default-icon"><UploadOutlined /></div>
                  </div>
               )}
            </div>
            <div className="profile__user-inner">
               <p className="profile__name">{login}</p>
               <p className="profile__info-item">Город: {city}</p>
               <p className="profile__info-item">Пол: {gender ? gender : 'Не указан'}</p>
               <p className="profile__info-item">Аккаунт создан: {new Date(`${createdAt}`).toDateString()}</p>
            </div>
         </div>
         <div className="profile__detail">
            <div className="profile__info-row">
               <p className="profile__info-title">Заказы</p>
               <Link to="/profile/orders" className="profile__info-link">Все заказы</Link>
            </div>
            <p className="profile__info-item">Всего: {orders.length}</p>
            <div className="profile__history">
               {orders.map(order => (
                  <Link to={`/catalog`} className="profile__history-order" key={order.id}>
                     <div className="profile__history-image">
                        <img src={order.image} alt={order.name} />
                     </div>
                     <p>{order.name}</p>
                  </Link>
               ))}
            </div>
            <div className="profile__diagram">
               <Diagram categories={categories} orderCounter={orderCounter} />
            </div>
         </div>
      </div>
   )
})

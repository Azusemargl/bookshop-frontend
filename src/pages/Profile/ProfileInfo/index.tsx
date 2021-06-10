import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removePhoto, savePhoto } from '../../../store/reducers/userReducer'
import { AppState } from '../../../store/store'
import { Diagram } from './diagram'
import { CloseCircleFilled, UploadOutlined, UserAddOutlined } from '@ant-design/icons'
import './profileInfo.scss'
import { userAnalysis } from '../../../utils/helpers/userAnalysis'

// TODO: Update user photo after server response

export const Info: React.FC = React.memo(() => {
   const dispatch = useDispatch()
   const {
      id, login, avatar, balance, scores, city, gender, orders, createdAt
   } = useSelector((state: AppState) => state.user)

   // Get image file
   const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length && id) {
         dispatch(savePhoto(id, e.target.files[0]))
      }
   }

   const onAvatarRemove = () => {
      id && dispatch(removePhoto(id))
   }

   const categories = userAnalysis.getCategories(orders)
   const orderCounter = userAnalysis.getCategoriesCount(categories, orders)

   return (
      <div className="profile__info">
         <div className="profile__user">
            <div className="profile__image-container">
               <div className="profile__image">
                  {(avatar.photo && !avatar.error) ? (
                     <img src={`http://localhost:5000/images/${avatar.photo}`} className="profile__image-avatar" alt={`${login}`} />
                  ) : (
                     <div className="profile__image-default">
                        <UserAddOutlined />
                     </div>
                  )}
                  <label htmlFor="avatar-select" />
                  <input hidden id="avatar-select" type="file" onChange={onFileUpload} />
                  <div className="profile__image-icon"><UploadOutlined /></div>
               </div>
               {(avatar.photo && !avatar.error) && <button className="profile__image-delete" onClick={onAvatarRemove}>
                  <CloseCircleFilled />
               </button>}
            </div>
            <div className="profile__user-inner">
               <p className="profile__name">{login}</p>
               <p className="profile__info-item">Город: {city}</p>
               <p className="profile__info-item">Баланс: {balance} ₽</p>
               <p className="profile__info-item">Баллы: {scores}</p>
               <p className="profile__info-item">Пол: {gender ? gender : 'Не указан'}</p>
               <p className="profile__info-item">Аккаунт создан: {new Date(`${createdAt}`).toDateString()}</p>
            </div>
         </div>
         {avatar.error && <span className="profile__image-error">{avatar.error}</span>}
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

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites, removeFavorites } from '../../store/reducers/userReducer'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { AppState } from '../../store/store'
import './favorites.scss'

const Favorites: React.FC<Props> = React.memo(({ bookId }) => {
   const { id, auth, favorites } = useSelector((state: AppState) => state.user)

   const dispatch = useDispatch()

   // Set favorites books
   const onFetchFavorites = (userId: string, bookId: string) => {
      dispatch(fetchFavorites(userId, bookId))
   }

   // Remove favorites books
   const onDeleteFavorites = (userId: string, bookId: string) => {
      dispatch(removeFavorites(userId, bookId))
   }

   return (
      <div className="favorites">
         {auth && favorites.some(item => `${item._id}` === bookId) ? (
            <button className="favorites__button added" onClick={e => id && onDeleteFavorites(id, bookId)} key={bookId}>
               <HeartFilled />
            </button>
         ) : (
            <button className="favorites__button" onClick={e => id && onFetchFavorites(id, bookId)}>
               <HeartOutlined />
            </button>
         )}
      </div>
   )
})

export default Favorites

// Types
type Props = {
   bookId: string
}

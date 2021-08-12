import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites, removeFavorites } from '../../store/reducers/userReducer'
import { actions } from '../../store/reducers/appReducer'
import { AppState } from '../../store/store'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import './favorites.scss'

const Favorites: React.FC<Props> = React.memo(({ bookId }) => {
   const { id, auth, favorites } = useSelector((state: AppState) => state.user)

   const dispatch = useDispatch()

   const onFavoritesChange: FavoritesChangeType = (userId, bookId, thunkAction) => {
      auth && userId
         ? dispatch(thunkAction(userId, bookId))
         : dispatch(actions.setAuthForm(true))
   }

   return (
      <div className="favorites">
         {auth && favorites.some(item => `${item._id}` === bookId) ? (
            <button className="favorites__button added" onClick={() => onFavoritesChange(id, bookId, removeFavorites)} key={bookId}>
               <HeartFilled />
            </button>
         ) : (
            <button className="favorites__button" onClick={() => onFavoritesChange(id, bookId, fetchFavorites)}>
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
type FavoritesChangeType = (userId: string | null, bookId: string, thunkAction: (userId: string, bookId: string) => void) => void
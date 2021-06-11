import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { discount } from '../../utils/helpers/discount'
import { StarFilled, StarOutlined, ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons'
import { BookCard } from '../../types/bookTypes'
import './product.scss'
import { fetchFavorites, removeFavorites } from '../../store/reducers/userReducer'
import { AppState } from '../../store/store'

const Product: React.FC<Props & BookCard> = React.memo((props) => {
   const dispatch = useDispatch()
   const { auth, id, favorites } = useSelector((state: AppState) => state.user)
   const { _id, name, image, author, rating, review, price, past_price, sales, mainPage } = props

   const filled = []
   const outlined = []
   for (let i = 0; i < rating; i++) {
      filled.push(rating)
   }
   for (let i = 0; i < 5 - rating; i++) {
      outlined.push(rating)
   }

   // Set favorites books
   const onFetchFavorites = (userId: string, bookId: string) => {
      dispatch(fetchFavorites(userId, bookId))
   }

   // Remove favorites books
   const onDeleteFavorites = (userId: string, bookId: string) => {
      dispatch(removeFavorites(userId, bookId))
   }

   return (
      <div className={classnames("product", { "main-page": mainPage })}>
         <div>
            <div className="product__image">
               <Link to="/" className="product__image_container">
                  <img src={image} alt={name} />
               </Link>
               {auth && id &&
                  <button className="product__favorites">
                     {favorites.some(item => `${item._id}` === _id)
                        ? <HeartFilled onClick={e => onDeleteFavorites(id, _id)} key={_id} />
                        : <HeartOutlined onClick={e => onFetchFavorites(id, _id)} key={_id} />
                     }
                  </button>
               }
               <span className="product__flag discount">− {discount(past_price, price)}%</span>
               {sales && sales >= 1000 && <span className="product__flag bestsellers">Бестселлер</span>}
            </div>
            <Link to="/">
               <h4 className="product__name">Атака титанов. Книга 1</h4>
            </Link>
            <Link to="/">
               <p className="product__author">{author}</p>
            </Link>
            <div className="product__rating">
               <div className="product__stars">
                  {filled.map(filled => <span key={Math.random()}><StarFilled /></span>)}
                  {outlined.map(outlined => <span key={Math.random()}><StarOutlined /></span>)}
               </div>
               <p className="product__review">{review}</p>
            </div>
         </div>
         <div className="product__footer">
            <div className="product__prices">
               <p className="product__current-price">{price} ₽</p>
               <p className="product__past-price">{past_price} ₽</p>
            </div>
            <button className="product__cart">
               <ShoppingCartOutlined />
            </button>
         </div>
      </div>
   )
})

export default Product

// Type
type Props = {
   mainPage?: boolean
}

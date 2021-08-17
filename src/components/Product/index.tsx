import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { fetchCartItem, removeCartItem } from '../../store/reducers/cartReducer'
import { actions } from '../../store/reducers/appReducer'
import { discount } from '../../utils/helpers/discount'
import Favorites from '../Favorites'
import { AppState } from '../../store/store'
import { BookCard } from '../../types/bookTypes'
import { ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons'
import './product.scss'

const Product: React.FC<Props & BookCard> = React.memo((props) => {
   const dispatch = useDispatch()
   const { id, auth, cart } = useSelector((state: AppState) => state.user)
   const { books, isDisabled } = useSelector((state: AppState) => state.cart)
   const { _id, name, image, author, rating, review, price, past_price, sales, mainPage } = props

   const filled = []
   const outlined = []
   for (let i = 0; i < rating; i++) {
      filled.push(rating)
   }
   for (let i = 0; i < 5 - rating; i++) {
      outlined.push(rating)
   }

   const disabled = isDisabled.some(item => item === _id)
   const currentCartitem = books.length && books.find(item => item.book._id === _id)

   // Add cart item
   const onCartAdd = (bookId: string | null, cart: string | null) => {
      auth && bookId && cart
         ? dispatch(fetchCartItem(bookId, cart))
         : dispatch(actions.setAuthForm(true))
   }

   // Remove cart item
   const onCartRemove = (bookId: string, cart: string, cartProductId: string) => {
      dispatch(removeCartItem(bookId, cart, cartProductId))
   }

   return (
      <div className={classnames("product", { "main-page": mainPage })}>
         <div>
            <div className="product__image">
               <Link to={`/catalog/${_id}`} className="product__image_container">
                  <img src={image} alt={name} />
               </Link>
               <Favorites bookId={_id} />
               <span className="product__flag discount">− {discount(past_price, price)}%</span>
               {sales && sales >= 1000 && <span className="product__flag bestsellers">Бестселлер</span>}
            </div>
            <Link to={`/catalog/${_id}`}>
               <h4 className="product__name">{name}</h4>
            </Link>
            <p className="product__author">{author}</p>
         </div>
         <div className="product__footer">
            <div className="product__prices">
               <p className="product__current-price">{price} ₽</p>
               <p className="product__past-price">{past_price} ₽</p>
            </div>
            {auth && books && books.length >= 1 && currentCartitem && books.some(item => item.book._id === _id) ? (
               <button className="product__cart remove" onClick={() => (
                  id && cart && onCartRemove(_id, cart, currentCartitem._id)
               )} disabled={disabled}>
                  <CheckOutlined />
               </button>
            ) : (
               <button className="product__cart" onClick={() => onCartAdd(_id, cart)} disabled={disabled}>
                  <ShoppingCartOutlined />
               </button>
            )}
         </div>
      </div>
   )
})

export default Product

// Type
type Props = {
   mainPage?: boolean
}

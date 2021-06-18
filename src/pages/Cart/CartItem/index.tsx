import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeCartItem } from "../../../store/reducers/cartReducer"
import { Favorites } from "../../../components"
import { AppState } from "../../../store/store"
import { DeleteOutlined, LoadingOutlined, SolutionOutlined } from "@ant-design/icons"
import './cartItem.scss'

export const CartItem: React.FC<Props> = React.memo(({ bookId, image, name, author, past_price, price }) => {
  const dispatch = useDispatch()

  const { books, isDisabled } = useSelector((state: AppState) => state.cart)
  const { id, cart } = useSelector((state: AppState) => state.user)
  
  const disabled = isDisabled.some(item => item === bookId)
  const currentCartitem = books.find(item => item.book._id === bookId)

  // Remove cart item
  const onCartRemove = (bookId: string, cart: string, cartProductId: string) => {
    dispatch(removeCartItem(bookId, cart, cartProductId))
  }

  return (
    <div className="cart__item" key={bookId}>
      <div className="cart__item-info">
        <Link to={`catalog/${bookId}`} className="cart__item-image">
          <img src={image} alt={name} />
        </Link>
        <div className="cart__item-title">
        <Link to={`catalog/${bookId}`} className="cart__item-name">{name}</Link>
          <Link to={`catalog/${author}`} className="cart__item-author">
            <SolutionOutlined />
            {author}
          </Link>
        </div>
      </div>
      <div className="cart__item-info">
        <div className="cart__item-prices">
          {past_price &&
            <p className="cart__item-past_price">
              {past_price}
              <span>₽</span>
            </p>}
          <p className="cart__item-price">
            {price}
            <span>₽</span>
          </p>
        </div>
        <div className="cart__item-icons">
          <Favorites bookId={bookId} />
          <div className="cart__item-remove">
            {disabled ? (
              <LoadingOutlined />
            ) : (
              <Fragment>
                <button
                  className="cart__item-item_remove"
                  onClick={(e) => {
                    return id && currentCartitem && cart && onCartRemove(bookId, cart, currentCartitem._id)
                  }}
                >
                  <DeleteOutlined />
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

// Types
type Props = {
  bookId: string
  image: string
  name: string
  author: string
  past_price?: number
  price: number
}

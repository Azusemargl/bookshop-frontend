import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { changeCountCartItem, removeCartItem } from "../../../store/reducers/cartReducer"
import { Favorites } from "../../../components"
import { AppState } from "../../../store/store"
import { DeleteOutlined, LoadingOutlined, MinusOutlined, PlusOutlined, SolutionOutlined } from "@ant-design/icons"
import './cartItem.scss'

export const CartItem: React.FC<Props> = React.memo(({ bookId, image, name, author, past_price, price }) => {
  const dispatch = useDispatch()

  const { books, isDisabled } = useSelector((state: AppState) => state.cart)
  const { id, cart } = useSelector((state: AppState) => state.user)

  const disabled = isDisabled.some(item => item === bookId) // Disable button during server answer expectation
  const currentCartItem = books.length && books.find(item => item.book._id === bookId) // Current cart item

  const [value, setValue] = React.useState((currentCartItem && `${currentCartItem.count}`) || '1') // Cart item counter

  // Remove cart item
  const onCartRemove = (bookId: string, cart: string, cartProductId: string) => {
    dispatch(removeCartItem(bookId, cart, cartProductId))
  }

  // Send cart item count to state
  const onValueSend = (value: string) => {
    const currentValue = +value

    if (currentValue <= 0) setValue('1')
    if (currentValue > 50) setValue('50')
    if (currentValue > 0 && currentValue <= 50 && currentCartItem) {
      dispatch(changeCountCartItem(currentCartItem._id, +value))
    }
  }

  // Increase counter
  const increase = (value: string) => {
    const currentValue = +value + 1
    setValue(`${currentValue}`)
    onValueSend(`${currentValue}`)
  }

  // Decrease counter
  const decrease = (value: string) => {
    const currentValue = +value - 1
    setValue(`${currentValue}`)
    onValueSend(`${currentValue}`)
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
        <div className="cart__item-counter">
          {+value !== 1 &&
            <button className="cart__item-btn increase" onClick={e => decrease(value)}><MinusOutlined /></button>
          }
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={e => onValueSend(value)}
          />
          {+value !== 50 &&
            <button className="cart__item-btn increase" onClick={e => increase(value)}><PlusOutlined /></button>
          }
        </div>
        <div className="cart__item-prices">
          {past_price &&
            <p className="cart__item-past_price">
              {past_price * (+value)}
              <span>₽</span>
            </p>}
          <p className="cart__item-price">
            {price * (+value)}
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
                    return id && currentCartItem && cart && onCartRemove(bookId, cart, currentCartItem._id)
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

import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Button, Empty, Section } from '../../components'
import { Content, Sidebar } from '../../layouts'
import { CartItem } from './CartItem'
import { AppState } from '../../store/store'
import { LoadingOutlined, RightOutlined } from '@ant-design/icons'
import './cart.scss'

const Cart: React.FC = React.memo(() => {
   // Page config
   const title = 'Корзина'

   const { isLoading } = useSelector((state: AppState) => state.app)
   const cartLoading = useSelector((state: AppState) => state.cart.isLoading)
   const bookId = useSelector((state: AppState) => state.cart.books)
   const books = useSelector((state: AppState) => state.books.items)

   // Order data
   const totalPastPrice = bookId && bookId.reduce((prev, next) => prev + next.book.past_price * next.count, 0)
   const totalPrice = bookId && bookId.reduce((prev, next) => prev + next.book.price * next.count, 0)
   const scores = totalPrice * 0.01

   return (
      <Content title={title}>
         <div className="cart">
            {!bookId.length && cartLoading && !isLoading ? (
               <div className="cart__loading"><LoadingOutlined /></div>
            ) : (
               <Fragment>
                  {bookId && bookId.length >= 1 && !isLoading ? (
                     <Sidebar>
                        <div className="cart__content">
                           {bookId.map(item => (
                              <CartItem
                                 key={item.book._id}
                                 bookId={item.book._id}
                                 image={item.book.image}
                                 name={item.book.name}
                                 author={item.book.author}
                                 past_price={item.book.past_price}
                                 price={item.book.price}
                              />
                           ))}
                        </div>
                        <div className="cart__info">
                           <p className="cart__title">В корзине</p>
                           <p className="cart__book-counter">
                              {bookId.length === 1
                                 ? <span>{bookId.length} товар</span>
                                 : <span>{bookId.length} товара</span>
                              }
                           </p>
                           <div className="cart__info-inner">
                              <div className="cart__info-field">
                                 <p>Стоимость без скидки:</p>
                                 <p>{totalPastPrice} ₽</p>
                              </div>
                              <div className="cart__info-field total_price">
                                 <p>Общая стоимость:</p>
                                 <p>{totalPrice} ₽</p>
                              </div>
                           </div>
                           <Button size={'small'}>
                              <p>Оформить заказ</p>
                              <RightOutlined />
                           </Button>
                           <p className="cart__scores">
                              Вы получите бонусов: <span>{scores.toFixed(1)}</span>
                           </p>
                        </div>
                     </Sidebar>
                  ) : (
                     <Empty title="Корзина пуста" />
                  )}
               </Fragment>
            )}
            <Section title="Лучшие цены" books={books} filter="best_prices" />
         </div>
      </Content>
   )
})

export default Cart

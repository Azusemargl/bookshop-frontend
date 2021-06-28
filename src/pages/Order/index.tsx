import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { Content } from '../../layouts'
import { fetchOrder } from '../../store/reducers/orderReducer'
import { AppState } from '../../store/store'
import { Order as OrderType } from '../../types/orderTypes'
import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import './order.scss'

// TODO: Create redirect to success order page

const Order: React.FC = React.memo(() => {
   // Page config
   const title = 'Оформить заказ'

   const dispatch = useDispatch()

   // Order state
   const [order, setOrder] = React.useState<OrderType>()
   const [address, setAddress] = React.useState('')
   const [isAddress, setIsAddress] = React.useState(true)

   // Order data from state
   const cartBook = useSelector((state: AppState) => state.cart.books)
   const { id, city, login, email } = useSelector((state: AppState) => state.user)
   const cartLoading = useSelector((state: AppState) => state.cart.isLoading)

   // Order data
   const books = cartBook.map(item => ({ book: item.book, count: item.count }))
   const totalPrice = cartBook && cartBook.reduce((prev, next) => prev + next.book.price * next.count, 0)

   // Change address data
   const onSetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value)
      e.target.value.length <= 0 ? setIsAddress(false) : setIsAddress(true)
   }

   // Dispatch order data
   const onOrder = () => {
      address.length > 0 && order ? dispatch(fetchOrder(order)) : setIsAddress(false)
      console.log('redirect')
   }

   // Order fields
   const fields = [
      { label: 'Стоимость:', value: totalPrice, key: 'price', isChangeable: false, edit: false },
      { label: 'Имя:', value: login, key: 'name', isChangeable: true, edit: false },
      { label: 'Город:', value: city, key: 'city', isChangeable: true, edit: false },
      { label: 'E-mail:', value: email, key: 'email', isChangeable: true, edit: false }
   ] as Array<Fields>

   const onFieldEdit = (key: Keys) => {
      fields.map(item => item.key === key ? { ...item, edit: !item.edit } : item)
   }

   React.useEffect(() => {
      setOrder({
         cartProductsId: cartBook,
         price: totalPrice,
         userId: id,
         name: login,
         email: email,
         city: city,
         address: address,
         completed: false
      })
   }, [address])

   return (
      <Content title={title}>
         <div className="order">
            <h4>Информация о заказе:</h4>
            {cartLoading ? (
               <LoadingOutlined />
            ) : (
               <div className="order__data">
                  {fields.map(item => (
                     <div className="order__field" key={item.key} onClick={e => onFieldEdit(item.key)}>
                        <p className="order__label">{item.label}</p>
                        {item.edit ? (
                           <input type="text" />
                        ) : (
                           <p className={classnames("order__value", { "change": item.isChangeable })}>
                              {item.value} {item.key === 'price' && '₽'}
                              {item.isChangeable && <EditOutlined />}
                           </p>
                        )}
                     </div>
                  ))}
                  <div className="order__field">
                     <p className="order__label">Адрес доставки:</p>
                     <input type="text"
                        className={classnames("order__input", { "error": !isAddress })}
                        value={address}
                        onChange={e => onSetAddress(e)}
                        placeholder="Полный адрес"
                     />
                     {!isAddress && <span className="order__error">Обязателное поле</span>}
                  </div>
               </div>
            )}

            <h4>Список книг:</h4>
            <ul className="order__books">
               {books.map((item, index) => (
                  <li className="order__book" key={item.book._id}>
                     <span>{index + 1})</span>
                     <Link to={`/catalog/${item.book._id}`}>{item.book.name}</Link>
                     <span>x{cartBook.map(cartItem => cartItem.book._id === item.book._id && cartItem.count)}</span>
                  </li>
               ))}
            </ul>

            <button className="button" onClick={e => onOrder()}>Оформить</button>
         </div>
      </Content>
   )
})

export default Order

// Types
type Fields = {
   label: string
   value: string | number | null
   key: Keys
   isChangeable: boolean
   edit: boolean
}

type Keys = 'price' | 'name' | 'city' | 'email'

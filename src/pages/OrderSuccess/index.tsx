import React from 'react'
import { Link } from 'react-router-dom'
import { CheckOutlined } from '@ant-design/icons'
import './orderSuccess.scss'

const OrderSuccess: React.FC = React.memo(() => {
   return (
      <div className="order__success">
         <div className="order__success-icon">
            <CheckOutlined />
         </div>
         <p>Ваш заказ успешно создан!</p>
         <Link to="/profile/orders">Посмотреть заказы</Link>
         <Link to="/catalog">Каталог книг</Link>
      </div>
   )
})

export default OrderSuccess

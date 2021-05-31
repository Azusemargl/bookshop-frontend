import React from 'react'
import { Link } from 'react-router-dom'
import { StarFilled, StarOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import { Books } from '../../types/types'
import './product.scss'

const Product: React.FC<Books> = ({ name, image, author, rating, review, price, past_price }) => {
   const filled = []
   const outlined = []
   for (let i = 0; i < rating; i++) {
      filled.push(rating)
   }
   for (let i = 0; i < 5 - rating; i++) {
      outlined.push(rating)
   }

   return (
      <div className="product">
         <div>
            <div className="product__image">
               <Link to="/" className="product__image_container">
                  <img src={image} alt={name} />
               </Link>
               <button className="product__favorites"><HeartOutlined /></button>
               <span className="product__discount">− 13%</span>
            </div>
            <Link className="product__image" to="/">
               <h4 className="product__name">Атака титанов. Книга 1</h4>
            </Link>
            <Link className="product__image" to="/">
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
}

export default Product

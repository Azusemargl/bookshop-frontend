import React from 'react'
import { Link } from 'react-router-dom'
import { StarFilled, StarOutlined, ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import './product.scss'

const Product = () => {
   return (
      <div className="products">
         <div className="product">
            <div>
               <div className="product__image">
                  <Link to="/" className="product__image_container">
                     <img src="https://cdn1.ozone.ru/s3/multimedia-d/wc1200/6011956477.jpg" alt="Атака титанов" />
                  </Link>
                  <button className="product__favorites"><HeartOutlined /></button>
                  <span className="product__discount">− 13%</span>
               </div>
               <Link className="product__image" to="/">
                  <h4 className="product__name">Атака титанов. Книга 1</h4>
               </Link>
               <Link className="product__image" to="/">
                  <p className="product__author">Исаяма Хадзимэ</p>
               </Link>
               <div className="product__rating">
                  <div className="product__stars">
                     <StarFilled />
                     <StarFilled />
                     <StarFilled />
                     <StarFilled />
                     <StarFilled />
                  </div>
                  <p className="product__review">723</p>
               </div>
            </div>
            <div className="product__footer">
               <div className="product__prices">
                  <p className="product__current-price">495 ₽</p>
                  <p className="product__past-price">569 ₽</p>
               </div>
               <button className="product__cart">
                  <ShoppingCartOutlined />
               </button>
            </div>
         </div>
         <div className="product">
            <div>
               <div className="product__image">
                  <Link to="/" className="product__image_container">
                     <img src="https://cdn1.ozone.ru/multimedia/wc1200/1017508200.jpg" alt="Технологическая сингулярность" />
                  </Link>
                  <button className="product__favorites"><HeartOutlined /></button>
                  <span className="product__discount">− 16%</span>
               </div>
               <Link className="product__image" to="/">
                  <h4 className="product__name">Технологическая сингулярность</h4>
               </Link>
               <Link className="product__image" to="/">
                  <p className="product__author">Шанахан Мюррей</p>
               </Link>
               <div className="product__rating">
                  <div className="product__stars">
                     <StarFilled />
                     <StarFilled />
                     <StarFilled />
                     <StarFilled />
                     <StarOutlined />
                  </div>
                  <p className="product__review">31</p>
               </div>
            </div>
            <div className="product__footer">
               <div className="product__prices">
                  <p className="product__current-price">325 ₽</p>
                  <p className="product__past-price">387 ₽</p>
               </div>
               <button className="product__cart">
                  <ShoppingCartOutlined />
               </button>
            </div>
         </div>
      </div>
   )
}

export default Product

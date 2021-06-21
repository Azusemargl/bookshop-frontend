import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItem } from '../../store/reducers/cartReducer'
import { Favorites, Section, Spiner } from '../../components'
import { AppState } from '../../store/store'
import { Books } from '../../types/bookTypes'
import { CheckOutlined, CommentOutlined, HomeFilled, StarFilled } from '@ant-design/icons'
import './detail.scss'

const DetailContainer: React.FC = React.memo(() => {
   const path = useHistory()
   const id = path.location.pathname.split('/')[path.location.pathname.split.length]
   const cartId = useSelector((state: AppState) => state.user.cart)
   const books = useSelector((state: AppState) => state.books.items)

   const book = books.find(book => book._id === id) // Get current book

   React.useEffect(() => window.scrollTo(0, 0), [book])

   if (!book) return <Spiner />

   return <Detail
      books={books}
      cartId={cartId}
      bookId={book._id}
      name={book.name}
      image={book.image}
      rating={book.rating}
      review={book.review}
      past_price={book.past_price}
      price={book.price}
      author={book.author}
      publisher={book.publisher}
      year={book.year_of_issue}
      category={book.category}
      cover_type={book.cover_type}
      number_of_pages={book.number_of_pages}
      age_restrictions={book.age_restrictions}
      description={book.description}
   />
})

const Detail: React.FC<Props> = React.memo((props) => {
   const dispatch = useDispatch()
   const cart = useSelector((state: AppState) => state.cart.books)
   const { isDisabled, isLoading } = useSelector((state: AppState) => state.cart)
   const {
      books, cartId, bookId, name, image, rating,
      review, price, past_price, author, publisher,
      year, category, cover_type, number_of_pages,
      age_restrictions, description
   } = props

   const disabled = isDisabled.some(item => item === bookId) // Disable check
   const isCart = cart.some(item => item.book._id === bookId) // Check item cart existing

   // Add cart item
   const onCartAdd = (bookId: string, cart: string) => {
      dispatch(fetchCartItem(bookId, cart))
   }

   return (
      <div className="detail">
         <div className="detail__breadcrumbs">
            <Link to="/"><HomeFilled /></Link> /
            <Link to="/catalog"> Каталог</Link> /
            <Link to="/catalog"> {category}</Link>
         </div>
         <div className="detail__intro">
            <div className="detail__image">
               <img src={image} alt={name} />
            </div>
            <div className="detail__info-container">
               <h1 className="detail__name">{name}</h1>
               <div className="detail__rating">
                  <div className="detail__rating-inner">
                     <StarFilled />
                     <p>{rating}</p>
                  </div>
                  <div className="detail__rating-inner">
                     <CommentOutlined />
                     <p>{review} Отзывов</p>
                  </div>
               </div>
               <div className="detail__price">
                  <p>{price} <span>₽</span></p>
                  <p>{past_price} <span>₽</span></p>
               </div>
               <div className="detail__actions">
                  {!cart.length && isLoading
                     ? <Spiner />
                     : (
                        isCart ? (
                           <Link className="button" to="/cart">Оформить заказ <CheckOutlined /></Link>
                        ) : (
                           <button className="button detail__btn" onClick={e => cartId && onCartAdd(bookId, cartId)} disabled={disabled}>
                              В корзину
                           </button>
                        )
                     )
                  }
                  <Favorites bookId={bookId} />
               </div>
               <div className="detail__info">
                  <h4 className="detail__title">Характеристики:</h4>
                  <p className="detail__info-row">
                     <span>Автор:</span>
                     <span><Link to={`/catalog/`}>{author}</Link></span>
                  </p>
                  <p className="detail__info-row">
                     <span>Издательство:</span>
                     <span><Link to={`/catalog/`}>{publisher}</Link></span>
                  </p>
                  <p className="detail__info-row">
                     <span>Категория:</span>
                     <span><Link to={`/catalog/`}>{category}</Link></span>
                  </p>
                  <p className="detail__info-row">
                     <span>Тип обложки:</span>
                     <span>{cover_type}</span>
                  </p>
                  <p className="detail__info-row">
                     <span>Количество страниц:</span>
                     <span>{number_of_pages}</span>
                  </p>
                  {age_restrictions && <p className="detail__info-row">
                     <span>Возрастные ограничения:</span>
                     <span>{age_restrictions}+</span>
                  </p>}
               </div>
            </div>
         </div>
         <div className="detail__description">
            <h4 className="detail__title">Описание:</h4>
            <p className="detail__description-text">{description}</p>
         </div>
         <Section title="Лучшие цены" filter="best_prices" books={books} />
      </div>
   )
})

export default DetailContainer

// Type
type Props = {
   books: Array<Books>
   cartId: string | null
   bookId: string
   name: string
   image: string
   rating: number
   review: number
   past_price: number
   price: number
   author: string
   publisher: string
   year: number
   category: string
   cover_type: string
   number_of_pages: number
   age_restrictions: number
   description: string
}

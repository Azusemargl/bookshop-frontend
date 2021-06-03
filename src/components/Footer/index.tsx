import React from 'react'
import { Link } from 'react-router-dom'
import './footer.scss'

export const Footer = React.memo(() => {
   return (
      <footer className="footer">
         <div className="container">
            <ul className="footer__col">
               <li className="footer__item"><Link to="/" className="footer__link">Главная</Link></li>
               <li className="footer__item"><Link to="/catalog" className="footer__link">Каталог</Link></li>
            </ul>
         </div>
      </footer>
   )
})

export default Footer

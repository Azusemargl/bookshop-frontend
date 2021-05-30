import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Header, Sidemenu, TopBar, Product } from './components'

const Home = () => {
  return (
    <Product />
  )
}

const Catalog = () => {
  return (
    <div>Catalog</div>
  )
}

const Wrapper = () => {
  return (
    <div className="wrapper">
      <TopBar cities={['Москва', 'Санкт-Петербург']} />
      <Header />
      <div className="container">
        <main className="main">
          <Sidemenu />
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/catalog" component={Catalog} />
          </div>
        </main>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  )
}

export default App

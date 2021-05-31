import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Products } from './containers'
import { Header, Sidemenu, TopBar } from './components'
import { store } from './store/store'

const Home = () => {
  return (
    <Products />
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
      <Provider store={store}>
        <Wrapper />
      </Provider>
    </BrowserRouter>
  )
}

export default App

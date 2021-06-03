import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Home, Catalog, Favorits } from './pages'
import { Header, Sidemenu, TopBar, Footer } from './components'
import { store } from './store/store'

const Wrapper: React.FC = React.memo(() => {
  return (
    <div className="wrapper">
      <TopBar cities={['Москва', 'Санкт-Петербург']} />
      <Header />
      <div className="wrapper__inner">
        <div className="container">
          <main className="main">
            <Sidemenu />
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route exact path="/catalog" component={Catalog} />
              <Route exact path="/favorits" component={Favorits} />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
})

const App: React.FC = React.memo(() => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Wrapper />
      </Provider>
    </BrowserRouter>
  )
})

export default App

import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { CookiesProvider } from "react-cookie"
import { useCookies } from "react-cookie"
import { AppState, store } from './store/store'
import { auth as userAuth } from './store/reducers/authReducer'
import { Home, Catalog, Favorits, Profile, Cart, Order, Detail, OrderSuccess, Search } from './pages'
import { Header, Sidemenu, TopBar, Footer } from './components'
import { fetchBooks } from './store/reducers/bookReducer'

const Wrapper: React.FC = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: AppState) => state.user)

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  React.useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  React.useEffect(() => {
    setCookie('token', token, { path: '/' })
  }, [token, setCookie])

  React.useEffect(() => {
    dispatch(userAuth(cookies.token))
  }, [dispatch, cookies.token])

  return (
    <div className="wrapper">
      <TopBar cities={['Москва', 'Санкт-Петербург']} />
      <Header removeCookie={removeCookie} />
      <div className="wrapper__inner">
        <div className="container">
          <main className="main">
            <Sidemenu />
            <div className="main_inner">
              <Route exact path="/" component={Home} />
              <Route exact path="/catalog" component={Catalog} />
              <Route exact path="/catalog/:id" component={Detail} />
              <Route exact path="/favorits" component={Favorits} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/order" component={Order} />
              <Route exact path="/order/success" component={OrderSuccess} />
              <Route path="/profile" component={Profile} />
              <Route path="/search" component={Search} />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const App: React.FC = React.memo(() => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Provider store={store}>
          <Wrapper />
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  )
})

export default App

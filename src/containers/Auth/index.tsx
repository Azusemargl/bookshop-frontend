import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { actions as appActions } from '../../store/reducers/appReducer'
import { actions as authActions } from '../../store/reducers/authReducer'
import { Login, Register } from '..'
import './auth.scss'

// TODO: Correct deleting body class after getting auth mistake

const Auth: React.FC<Props> = React.memo(({ setShowAuth, showAuth }) => {
   const dispatch = useDispatch()

   const [authPage, setAuth] = React.useState('login')

   // Close the auth window
   const onClose = React.useCallback(() => {
      document.body.classList.remove('modal-open') 

      setAuth('login')
      setShowAuth(false)

      dispatch(appActions.setAuthForm(false))
      dispatch(authActions.removeMessage())
   }, [showAuth, setShowAuth])

   return (
      <Fragment>
         {showAuth && (
            <div className="auth" onClick={() => onClose()}>
               <div className="auth-wrapper" onClick={e => e.stopPropagation()}>
                  {authPage === 'login'
                     ? <Login onClose={onClose} setAuth={setAuth} />
                     : <Register onClose={onClose} setAuth={setAuth} />
                  }
               </div>
            </div>
         )}
      </Fragment>
   )
})

export default Auth

// Types
type Props = {
   setShowAuth: (value: boolean) => void
   showAuth: boolean
}
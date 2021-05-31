import React from 'react'
import { Login, Register } from '..'
import './auth.scss'

const Auth: React.FC<Props> = ({ showAuth, setShowAuth }) => {
   const [authPage, setAuth] = React.useState('login')
   return (
      <>
         {showAuth &&
            <div className="auth">
               {authPage === 'login'
                  ? <Login onClose={setShowAuth} setAuth={setAuth} />
                  : <Register onClose={setShowAuth} setAuth={setAuth} />
               }
            </div>
         }
      </>
   )
}

export default Auth

// Types
type Props = {
   showAuth: boolean
   setShowAuth: (value: boolean) => void
}

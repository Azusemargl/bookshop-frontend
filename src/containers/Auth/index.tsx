import React from 'react'
import { Login, Register } from '..'
import './auth.scss'

const Auth: React.FC<Props> = React.memo(({ showAuth, setShowAuth }) => {
   const [authPage, setAuth] = React.useState('login')

   const authRef = React.useRef<HTMLDivElement>(null)
   const authWrapperRef = React.useRef<HTMLDivElement>(null)

   // Close the auth window
   const onClose = React.useCallback(() => {
      document.body.classList.remove('modal-open')
      setShowAuth(false)
   }, [setShowAuth])

   // Hide the auth window after click
   const handleOutsideClick = React.useCallback((e: MouseEvent) => {
      if (authRef.current !== null && authWrapperRef.current !== null) {
         const path = e.composedPath()
         if (!path.includes(authRef.current) && path.includes(authWrapperRef.current)) {
            onClose()
            document.removeEventListener('click', handleOutsideClick)
         }
      }
   }, [onClose])

   // Add listener for window clicks
   React.useEffect(() => {
      document.addEventListener('click', handleOutsideClick)
   }, [showAuth, handleOutsideClick])

   return (
      <>
         {showAuth &&
            <div className="auth" ref={authWrapperRef}>
               <div className="auth-wrapper" ref={authRef}>
                  {authPage === 'login'
                     ? <Login onClose={onClose} setAuth={setAuth} />
                     : <Register onClose={onClose} setAuth={setAuth} />
                  }
               </div>
            </div>
         }
      </>
   )
})

export default Auth

// Types
type Props = {
   showAuth: boolean
   setShowAuth: (value: boolean) => void
}

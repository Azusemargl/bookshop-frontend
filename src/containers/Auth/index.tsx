import React from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../store/reducers/authReducer'
import { Login, Register } from '..'
import './auth.scss'

const Auth: React.FC<Props> = React.memo(({ setShowAuth, showAuth }) => {
   const dispatch = useDispatch()

   const [authPage, setAuth] = React.useState('login')

   const authRef = React.useRef<HTMLDivElement>(null)
   const authWrapperRef = React.useRef<HTMLDivElement>(null)

   // Close the auth window
   const onClose = React.useCallback(() => {
      document.body.classList.remove('modal-open') 
      setAuth('login')
      dispatch(actions.removeMessage())
      setShowAuth(false)
   }, [showAuth, setShowAuth])

   // Hide the auth window after click
   const handleOutsideClick = React.useCallback((e: MouseEvent) => {
      if (authRef.current !== null && authWrapperRef.current !== null) {
         const path = e.composedPath()
         if (!path.includes(authRef.current) && path.includes(authWrapperRef.current)) {
            onClose()
            document.removeEventListener('mousedown', handleOutsideClick)
         }
      }
   }, [onClose])

   // Add listener for window clicks
   React.useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick)
   }, [onClose, handleOutsideClick])

   return (
      <>
         {showAuth && (
            <div className="auth" ref={authWrapperRef}>
               <div className="auth-wrapper" ref={authRef}>
                  {authPage === 'login'
                     ? <Login onClose={onClose} setAuth={setAuth} />
                     : <Register onClose={onClose} setAuth={setAuth} />
                  }
               </div>
            </div>
         )}
      </>
   )
})

export default Auth

// Types
type Props = {
   setShowAuth: (value: boolean) => void
   showAuth: boolean
}

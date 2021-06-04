import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../store/reducers/authReducer'
import { Login } from '../../components'
import { AppState } from '../../store/store'

const LoginContainer: React.FC<Props> = ({ onClose, setAuth }) => {
   const dispatch = useDispatch()
   const error = useSelector((state: AppState) => state.auth.errors.loginError)

   const onAuth = (value: {email: string, password: string}) => {
      dispatch(signIn(value))
   }

   return <Login onAuth={onAuth} onClose={onClose} setAuth={setAuth} authError={error} />
}

export default LoginContainer

// Types
type Props = {
   onClose: (values: boolean) => void
   setAuth: (values: string) => void
}

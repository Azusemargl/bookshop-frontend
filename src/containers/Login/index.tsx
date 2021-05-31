import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../../store/reducers/authReducer'
import { Login } from '../../components'
import { Login as LoginType } from '../../types/authTypes'

const LoginContainer: React.FC<Props> = ({ onClose, setAuth }) => {
   const dispatch = useDispatch()
   const onAuth = (value: LoginType) => {
      dispatch(signIn(value))
   }

   return <Login onAuth={onAuth} onClose={onClose} setAuth={setAuth} />
}

export default LoginContainer

// Types
type Props = {
   onClose: (values: boolean) => void
   setAuth: (values: string) => void
}

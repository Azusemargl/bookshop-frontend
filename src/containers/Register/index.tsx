import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../store/reducers/authReducer'
import { Register } from '../../components'
import { AppState } from '../../store/store'
import { Register as RegisterType } from '../../types/authTypes'

const RegisterContainer: React.FC<Props> = ({ onClose, setAuth }) => {
   const dispatch = useDispatch()
   const error = useSelector((state: AppState) => state.auth.errors.registerError)
   
   const onAuth = (value: RegisterType) => {
      dispatch(signUp(value))
   }

   return <Register onAuth={onAuth} onClose={onClose} setAuth={setAuth} authError={error} />
}

export default RegisterContainer

// Types
type Props = {
   onClose: (values: boolean) => void
   setAuth: (values: string) => void
}

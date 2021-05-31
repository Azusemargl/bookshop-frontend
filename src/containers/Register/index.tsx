import React from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/reducers/authReducer'
import { Register } from '../../components'
import { Register as RegisterType } from '../../types/authTypes'

const RegisterContainer: React.FC<Props> = ({ onClose, setAuth }) => {
   const dispatch = useDispatch()
   const onAuth = (value: RegisterType) => {
      dispatch(signUp(value))
   }

   return <Register onAuth={onAuth} onClose={onClose} setAuth={setAuth} />
}

export default RegisterContainer

// Types
type Props = {
   onClose: (values: boolean) => void
   setAuth: (values: string) => void
}

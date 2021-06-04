import React from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { actions } from '../../store/reducers/authReducer'
import { CloseOutlined } from '@ant-design/icons'
import { Filed } from '..'

const Login: React.FC<Props> = ({ onAuth, onClose, setAuth, authError }) => {
   const dispatch = useDispatch()
   
   // Close auth window
   const onCloseAction = () => {
      onClose(false)
   }

   // Toggle auth window
   const onToggleAction = () => {
      dispatch(actions.removeMessage())
      setAuth('register')
   }

   return (
      <Formik
         initialValues={{ email: '', password: '' }}
         validationSchema={yup.object().shape({
            email: yup.string().email('Неккоректный email').required('Обязательное поле'),
            password: yup.string().min(6, 'Минимум 6 символов').max(20, 'Максимум 20 символов').required('Обязательное поле')
         })}
         onSubmit={values => onAuth(values)}
      >
         <Form className="auth-form">
            <div className="auth-form__top">
               <div className="auth-form__top-title">
                  <h2>Войти в аккаунт</h2>
                  <div onClick={onCloseAction}><CloseOutlined /></div>
               </div>
               <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <div className="auth-form__fields">
               {authError && <span className="auth-form__error">{authError}</span>}
               <Filed name="email" placeholder="Email" type="email" authError={authError} />
               <Filed name="password" placeholder="Пароль" type="password" authError={authError} />
            </div>
            <button className="button" type="submit">Войти</button>
            <div className="auth-form__footer">
               <p>Нет аккаунта?</p>
               <span onClick={onToggleAction}>Зарегистрироваться</span>
            </div>
         </Form>
      </Formik>
   )
}

export default Login

// Types
type Props = {
   onAuth: (values: {email: string, password: string}) => void
   onClose: (values: boolean) => void
   setAuth: (values: string) => void
   authError: string | null
}

import React from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { CloseOutlined } from '@ant-design/icons'
import { Filed } from '..'
import { Login as LoginType } from '../../types/authTypes'

const Login: React.FC<Props> = ({ onAuth, onClose, setAuth }) => {
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
                  <button onClick={e => onClose(false)}><CloseOutlined /></button>
               </div>
               <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <div className="auth-form__fields">
               <Filed name="email" placeholder="Email" type="email" />
               <Filed name="password" placeholder="Пароль" type="password" />
            </div>
            <button className="button" type="submit">Войти</button>
            <div className="auth-form__footer">
               <p>Нет аккаунта?</p>
               <span onClick={e => setAuth('register')}>Зарегистрироваться</span>
            </div>
         </Form>
      </Formik>
   )
}

export default Login

// Types
type Props = {
   onAuth: (values: LoginType) => void
   onClose: (values: boolean) => void
   setAuth: (values: string) => void
}

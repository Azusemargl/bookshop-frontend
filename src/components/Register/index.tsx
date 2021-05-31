import React from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { CloseOutlined } from '@ant-design/icons'
import { Filed } from '..'
import { Register as RegisterType } from '../../types/authTypes'

const Register: React.FC<Props> = ({ onAuth, onClose, setAuth }) => {
   const onCloseAcion = () => {
      onClose(false)
      setAuth('login')
   }

   return (
      <Formik
         initialValues={{ login: '', email: '', password: '', confirmed_password: '', check: true }}
         validationSchema={yup.object().shape({
            login: yup.string().min(6, 'Минимум 6 символов').max(20, 'Максимум 20 символов').required('Обязательное поле'),
            email: yup.string().email('Неккоректный email').required('Обязательное поле'),
            password: yup.string().min(6, 'Минимум 6 символов').max(20, 'Максимум 20 символов').required('Обязательное поле'),
            confirmed_password: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
                  .min(6, 'Минимум 6 символов').max(20, 'Максимум 20 символов').required('Обязательное поле'),
            check: yup.boolean().oneOf([true], 'Вы должны дать согласие на обработку персональных данных'),
         })}
         onSubmit={values => onAuth(values)}
      >
         <Form className="auth-form">
            <div className="auth-form__top">
               <div className="auth-form__top-title">
                  <h2>Создать аккаунт</h2>
                  <button onClick={onCloseAcion}><CloseOutlined /></button>
               </div>
               <p>Пожалуйста, введите данные, чтобы зарегистрироваться</p>
            </div>
            <div className="auth-form__fields">
               <Filed name="login" placeholder="Логин" type="text" />
               <Filed name="email" placeholder="Email" type="email" />
               <Filed name="password" placeholder="Пароль" type="password" />
               <Filed name="confirmed_password" placeholder="Повтор пароля" type="password" />
               <Filed name="check" placeholder="" type="checkbox" label="Я даю свое согласие на обработку своих персональных данных" />
            </div>
            <button className="button" type="submit">Войти</button>
            <div className="auth-form__footer">
               <p>Нет аккаунта?</p>
               <span onClick={e => setAuth('login')}>Войти</span>
            </div>
         </Form>
      </Formik>
   )
}

export default Register

// Types
type Props = {
   onAuth: (values: RegisterType) => void
   onClose: (values: boolean) => void
   setAuth: (values: string) => void
}

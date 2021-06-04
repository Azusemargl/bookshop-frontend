import React from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { Filed } from '..'
import { actions } from '../../store/reducers/authReducer'
import { CloseOutlined } from '@ant-design/icons'
import { Register as RegisterType } from '../../types/authTypes'

const Register: React.FC<Props> = ({ onAuth, onClose, setAuth, authError }) => {
   const dispatch = useDispatch()

   // Close auth window
   const onCloseAction = () => {
      onClose(false)
   }

   // Toggle auth window
   const onToggleAction = () => {
      dispatch(actions.removeMessage())
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
                  <div onClick={onCloseAction}><CloseOutlined /></div>
               </div>
               <p>Пожалуйста, введите данные, чтобы зарегистрироваться</p>
            </div>
            <div className="auth-form__fields">
               {authError && <span className="auth-form__error">{authError}</span>}
               <Filed name="login" placeholder="Логин" type="text" authError={authError} />
               <Filed name="email" placeholder="Email" type="email" authError={authError} />
               <Filed name="password" placeholder="Пароль" type="password" authError={authError} />
               <Filed name="confirmed_password" placeholder="Повтор пароля" type="password" authError={authError} />
               <Filed
                  name="check"
                  placeholder=""
                  type="checkbox"
                  label="Я даю свое согласие на обработку своих персональных данных"
                  authError={authError}
               />
            </div>
            <button className="button" type="submit">Регистрация</button>
            <div className="auth-form__footer">
               <p>Есть аккаунт?</p>
               <span onClick={onToggleAction}>Войти</span>
            </div>
         </Form>
      </Formik>
   )
}

export default Register

// Types
type Props = {
   onAuth:    (values: RegisterType) => void
   onClose:   (values: boolean) => void
   setAuth:   (values: string) => void
   authError: string | null
}

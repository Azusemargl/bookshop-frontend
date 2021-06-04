import { instance } from './api'
import { Login } from '../../types/authTypes'

export const userAPI = {
   login: (email: string, password: string) => {
      return instance.post<Login>('/auth/login', { email, password }).then(res => res.data)
   },
   register: (login: string, email: string, password: string) => {
      return instance.post('/auth/register', { login, email, password }).then(res => res.data)
   },
   auth: (token: string) => {
      return instance.post<Login>('/auth/auth', { token }).then(res => res.data)
   }
}

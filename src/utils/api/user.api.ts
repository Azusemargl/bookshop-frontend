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
   },
   avatar: (id: string, file: File) => {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const fd = new FormData()

      fd.append('id', id)
      fd.append('file', file)

      return instance.post('/user/avatar', fd, config).then(res => res.data)
   },
   deleteAvatar: (id: string) => {
      return instance.put('/user/avatar/delete', { id }).then(res => res.data)
   },
}

import { instance } from './api'
import { Login } from '../../types/authTypes'
import { Books } from '../../types/bookTypes'

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
   setFavorits: (userId: string, bookId: string) => {
      return instance.post<Array<Books>>('/user/favorites/set', { userId, bookId }).then(res => res.data)
   },
   removeFavorits: (userId: string, bookId: string) => {
      return instance.put<Array<Books>>('/user/favorites/remove', { userId, bookId }).then(res => res.data)
   },
   avatar: (id: string, file: File) => {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const fd = new FormData()

      fd.append('id', id)
      fd.append('file', file)

      return instance.post('/user/avatar', fd, config).then(res => res.data)
   },
   deleteAvatar: (id: string) => {
      return instance.put('/user/avatar/delete', { id })
   },
   updateLogin: (id: string | null, login: string) => {
      return instance.put<{login: string, message: string}>('/user/login/update', { id, login }).then(res => res.data)
   },
   updateEmail: (id: string | null, email: string) => {
      return instance.put<{email: string, message: string}>('/user/email/update', { id, email }).then(res => res.data)
   },
   updatePassword: (id: string, oldPasswod: string | null, password: string | null) => {
      return instance.put<{message: string}>('/user/password/update', { id, oldPasswod, password }).then(res => res.data)
   },
}

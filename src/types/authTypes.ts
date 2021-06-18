import { Books } from './bookTypes'

export type Auth = {
   email:    string
   password: string
}

export type Login = {
   id:     string
   auth?:  boolean
   login:  string
   email:  string
   avatar: {
      photo: string | null,
      error: string | null
   }
   role:   Array<string>
   balance: number
   scores: number
   cart: string
   token:  string
   message?: string | null
}

export type Register = {
   login:    string
   email:    string
   password: string
}

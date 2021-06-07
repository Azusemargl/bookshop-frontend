export type Auth = {
   email:    string
   password: string
}

export type Login = {
   id:     string
   auth?:  boolean
   login:  string
   email:  string
   avatar: string | null
   role:   Array<string>
   token:  string
   message?: string | null
}

export type Register = {
   login:    string
   email:    string
   password: string
}

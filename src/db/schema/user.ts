export interface User {
  id?: string
  name: string
  email: string
  created_at?: string
}

export type NewUser = Pick<User, 'name' | 'email'>
export interface Transaction {
  id?: string
  user_id: string
  category_id: number
  amount: number
  description: string
  transaction_date: string
  created_at?: string
}
  
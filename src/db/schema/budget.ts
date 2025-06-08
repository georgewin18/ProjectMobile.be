// src/db/schema/budget.ts
export interface Budget {
  id?: string
  user_id: string
  category_id: number
  amount: number
  used_amount: number
  alert_value: number
  start_date: string
  end_date: string
  created_at?: string
}
  
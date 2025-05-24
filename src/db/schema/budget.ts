// src/db/schema/budget.ts
export interface Budget {
  id?: string
  user_id: string
  total: number
  start_date: string
  end_date: string
  created_at?: string
}
  
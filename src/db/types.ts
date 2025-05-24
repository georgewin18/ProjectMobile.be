import { Budget } from './schema/budget'
import { Transaction } from './schema/transaction'
import { User } from './schema/user'

export interface Database {
  users: User
  transactions: Transaction
  budgets: Budget
}

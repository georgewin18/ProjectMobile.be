import { Budget } from './schema/budget'
import { Transaction } from './schema/transaction'

export interface Database {
  transactions: Transaction
  budgets: Budget
}
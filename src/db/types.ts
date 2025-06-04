import { ColumnType, Generated } from "kysely";

export interface TransactionTable {
  id: Generated<number>;
  user_id: string;
  category_id: number;
  amount: string;
  description: string;
  transaction_date: Date;
  created_at: ColumnType<Date, undefined, undefined>;
}

export interface BudgetsTable {
  id: Generated<number>;
  user_id: string;
  category_id: number;
  amount: string;
  start_date: Date;
  end_date: Date;
  created_at: ColumnType<Date, undefined, undefined>;
}

export interface BudgetUsagesTable {
  id: Generated<number>;
  budget_id: number;
  transaction_id: number;
  used_amount: string;
  created_at: ColumnType<Date, undefined, undefined>;
}

export interface Database {
  transactions: TransactionTable;
  budgets: BudgetsTable;
  budget_usages: BudgetUsagesTable;
}
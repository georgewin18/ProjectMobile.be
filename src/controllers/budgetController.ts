import { Request, Response } from 'express'
import db from '../db'

export const getBudgets = async (_req: Request, res: Response) => {
  const budgets = await db.selectFrom('budgets').selectAll().execute()
  res.json(budgets)
}

export const createBudget = async (req: Request, res: Response) => {
  const { user_id, total, start_date, end_date } = req.body

  const inserted = await db
    .insertInto('budgets')
    .values({ user_id, total, start_date, end_date })
    .returningAll()
    .executeTakeFirst()

  res.status(201).json(inserted)
}

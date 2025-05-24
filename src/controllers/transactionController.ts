import { Request, Response } from 'express'
import db from '../db'

export const getTransactions = async (_req: Request, res: Response) => {
  const transactions = await db.selectFrom('transactions').selectAll().execute()
  res.json(transactions)
}

export const createTransaction = async (req: Request, res: Response) => {
  const { user_id, amount, category } = req.body

  const inserted = await db
    .insertInto('transactions')
    .values({ user_id, amount, category })
    .returningAll()
    .executeTakeFirst()

  res.status(201).json(inserted)
}

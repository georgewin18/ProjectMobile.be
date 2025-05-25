import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middleware/requireAuth'
import db from '../db'

// export const getTransactions = async (_req: Request, res: Response) => {
//   const transactions = await db.selectFrom('transactions').selectAll().execute()
//   res.json(transactions)
// }

// export const createTransaction = async (req: Request, res: Response) => {
//   const { user_id, category_id, amount, description, transaction_date } = req.body

//   const inserted = await db
//     .insertInto('transactions')
//     .values({
//       user_id,
//       category_id,
//       amount,
//       description,
//       transaction_date
//     })
//     .returningAll()
//     .executeTakeFirst()

//   res.status(201).json(inserted)
// }


export const createTransaction = async (req: AuthenticatedRequest, res: Response) => {
  const { category_id, amount, description, transaction_date } = req.body
  const user_id = req.user!.id

  try {
    const inserted = await db
      .insertInto('transactions')
      .values({
        user_id,
        category_id,
        amount,
        description,
        transaction_date,
      })
      .returningAll()
      .executeTakeFirst()

    res.status(201).json(inserted)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create transaction' })
  }
}

export const getTransactions = async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user!.id

  try {
    const transactions = await db
      .selectFrom('transactions')
      .selectAll()
      .where('user_id', '=', user_id)
      .execute()

    res.json(transactions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch transactions' })
  }
}
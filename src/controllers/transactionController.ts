import { Request, RequestHandler, Response } from 'express'
import { AuthenticatedRequest } from '../middleware/requireAuth'
import db from '../db'

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
      .orderBy('created_at', 'desc')
      .execute()

    res.json(transactions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch transactions' })
  }
}

export const deleteTransaction: RequestHandler = async (req, res) => {
  const user_id = (req as AuthenticatedRequest).user!.id
  const { id } = req.body

  try {
    const result = await db
      .deleteFrom('transactions')
      .where('id', '=', id)
      .where('user_id', '=', user_id)
      .executeTakeFirst()

    if (result.numDeletedRows == 0n) {
      res.status(404).json({ message: 'Trransaction not found or you do not have permission to delete it' })
      return
    }
      
    res.status(200).json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete transaction' })
  }
}
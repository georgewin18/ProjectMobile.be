import { Request, Response } from 'express'
import db from '../db'
import { AuthenticatedRequest } from '../middleware/requireAuth'

export const createBudget = async (req: AuthenticatedRequest, res: Response) => {
  const { category_id, amount, used_amount, alert_value, start_date, end_date } = req.body
  const user_id = req.user!.id

  try {
    const inserted = await db
      .insertInto('budgets')
      .values({
        user_id,
        category_id,
        amount,
        used_amount,
        alert_value,
        start_date,
        end_date
      })
      .returningAll()
      .executeTakeFirst()

    res.status(201).json(inserted)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create budget' })
  }
}

export const getBudgets = async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user!.id

  try {
    const budgets = await db
      .selectFrom('budgets')
      .selectAll()
      .where('user_id', '=', user_id)
      .execute()

    res.json(budgets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch budgets' })
  }
}
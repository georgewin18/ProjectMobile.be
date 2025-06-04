import { Request, Response } from 'express'
import db from '../db'
import { AuthenticatedRequest } from '../middleware/requireAuth'
import { sql } from 'kysely'

export const createBudget = async (req: AuthenticatedRequest, res: Response) => {
  const { category_id, amount, start_date, end_date } = req.body
  const user_id = req.user!.id

  if (amount === undefined || !start_date || !end_date || category_id === undefined) {
    return res.status(400).json({ message: 'Category ID, amount, start date, and end date are required.' });
  }

  if (typeof amount !== 'number' || isNaN(parseFloat(String(amount)))) {
    return res.status(400).json({ message: 'Amount must be a valid number.' });
  }

  try {
    const valuesToInsert = {
      user_id,
      category_id: Number(category_id),
      amount: String(amount),
      start_date: new Date(start_date),
      end_date: new Date(end_date),
    }

    const inserted = await db
      .insertInto('budgets')
      .values(valuesToInsert)
      .returningAll()
      .executeTakeFirst();

    res.status(201).json(inserted);
  } catch (error) {
    console.error('Failed to create budget:', error);
    res.status(500).json({ message: 'Failed to create budget' });
  }
};

export const getBudgets = async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user!.id

  try {
    const budgets = await db
      .selectFrom('budgets')
      .selectAll()
      .where('user_id', '=', user_id)
      .orderBy('start_date', 'desc')
      .execute();

    res.status(200).json(budgets);
  } catch (error) {
    console.error('Failed to fetch budgets:', error);
    res.status(500).json({ message: 'Failed to fetch budgets' });
  }
};

export const getBudgetSummaries = async(req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user!.id;

  try {
    const budgetSummaries = await db
      .selectFrom('budgets')
      .leftJoin(
        'budget_usages',
        (join) => join.onRef('budgets.id', '=', 'budget_usages.budget_id')
      )
      .select([
        'budgets.id',
        'budgets.category_id',
        'budgets.amount as total_budget',
        (eb) => eb.fn.coalesce(
          eb.fn.sum('budget_usages.used_amount'),
          sql<number>`0`
        ).$castTo<number>().as('used_amount')
      ])
      .where('budgets.user_id', '=', user_id)
      .groupBy(['budgets.id', 'budgets.category_id', 'budgets.amount'])
      .orderBy('budgets.id', 'asc')
      .execute();

    res.status(200).json(budgetSummaries);  
  } catch (error) {
    console.error('Failed to fetch budget summaries:', error);
    res.status(500).json({ message: 'Failed to fetch budget summaries' });
  }
};
import { Request, Response } from 'express'
import db from '../db'
import { NewUser } from '../db/schema/user'

export const getUsers = async (req: Request, res: Response) => {
  const users = await db.selectFrom('users').selectAll().execute()
  res.json(users)
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body

  const inserted = await db
    .insertInto('users')
    .values({ name, email })
    .returningAll()
    .executeTakeFirst()

  res.status(201).json(inserted)
}

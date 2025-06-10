import { Router } from 'express'
import { getTransactions, createTransaction, deleteTransaction } from '../controllers/transactionController'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use((req, res, next) => requireAuth(req, res, next))

router.get('/', getTransactions)
router.post('/', createTransaction)
router.delete('/', deleteTransaction)

export default router

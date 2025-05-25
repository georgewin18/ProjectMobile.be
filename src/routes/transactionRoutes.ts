import { Router } from 'express'
import { getTransactions, createTransaction } from '../controllers/transactionController'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use((req, res, next) => requireAuth(req, res, next))

router.get('/', getTransactions)
router.post('/', createTransaction)

export default router

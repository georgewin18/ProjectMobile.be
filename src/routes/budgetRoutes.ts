import { Router } from 'express'
import { getBudgets, createBudget } from '../controllers/budgetController'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.use((req, res, next) => requireAuth(req, res, next))

router.get('/', getBudgets)
router.post('/', createBudget)

export default router

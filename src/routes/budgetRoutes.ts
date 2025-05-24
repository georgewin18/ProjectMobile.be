import { Router } from 'express'
import { getBudgets, createBudget } from '../controllers/budgetController'

const router = Router()

router.get('/', getBudgets)
router.post('/', createBudget)

export default router

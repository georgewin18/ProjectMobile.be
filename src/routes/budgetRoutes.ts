import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { createBudget, getBudgets } from '../controllers/budgetController'

const router = Router();

router.use((req, res, next) => requireAuth(req, res, next));

router.get('/', getBudgets)
router.post('/', createBudget)

export default router

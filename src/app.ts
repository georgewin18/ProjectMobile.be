import express from 'express'
import userRoutes from './routes/userRoutes'
import transactionRoutes from './routes/transactionRoutes'
import budgetRoutes from './routes/budgetRoutes'

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/budgets', budgetRoutes)

export default app

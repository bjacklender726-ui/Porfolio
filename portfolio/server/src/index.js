import express from 'express'
import cors from 'cors'
import projectsRouter from './routes/projects.js'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/projects', projectsRouter)
app.use('/api/contact', contactRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

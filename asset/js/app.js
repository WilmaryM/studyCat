const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

// manejo del error 404
app.use((req, res) => {
  res.status(404).send('<h1>404<h1/>')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

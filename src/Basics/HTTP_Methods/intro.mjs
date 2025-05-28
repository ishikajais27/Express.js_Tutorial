import express from 'express'
const app = express()
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
})
app.get('/search', (req, res) => {
  const { q } = req.query
  res.send(`You searched for: ${q}`)
})

// Example: http://localhost:3000/search?q=coffee

// POST a new user
app.post('/users', (req, res) => {
  res.send('Create a user')
})

// PUT update a user
app.put('/users/:id', (req, res) => {
  res.send(`Update user ${req.params.id}`)
})

// DELETE a user
app.delete('/users/:id', (req, res) => {
  res.send(`Delete user ${req.params.id}`)
})

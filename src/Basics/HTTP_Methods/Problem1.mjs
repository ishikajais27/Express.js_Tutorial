// Create a basic Express server with routes for: GET /books - returns "All books"
//  POST /books - returns "Book created" GET /books/:id - returns "Book with ID: [id]"
// PUT /books/:id - returns "Updated book [id]" DELETE /books/:id - returns "Deleted book [id]"

import express from 'express'
import fs from 'fs/promises'

const app = express()
const PORT = process.env.PORT || 4000
const filePath = './books.json'

app.use(express.json())

let books = JSON.parse(await fs.readFile(filePath, 'utf-8'))

//to handle post put methods
async function saveBooks(books) {
  await fs.writeFile(filePath, JSON.stringify(books, null, 2))
}

//GET METHOD
app.get('/books', (req, res) => {
  res.send(books)
})

//POST METHOD
app.post('/books', (req, res) => {
  const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Enter body') // ✅ fixed logic and status code
  }
  const newBook = { id: newId, ...req.body }
  books.push(newBook)
  saveBooks(books)
  res.status(201).json(newBook)
})

app.get('/books/:id', (req, res) => {
  const Id = parseInt(req.params.id)
  const requiredBook = books.find((u) => u.id === Id)
  if (requiredBook) {
    res.json(requiredBook)
  } else {
    res.status(404).send('Book not found')
  }
})

//PUT METHOD
app.put('/books/:id', (req, res) => {
  const Id = parseInt(req.params.id)
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Enter body') // ✅ fixed logic and status code
  }
  const newBook = { id: Id, ...req.body }
  books.push(newBook)
  saveBooks(books)
  res.status(201).json(newBook)
})

//DELETE METHOD
app.delete('/books/:id', (req, res) => {
  const Id = parseInt(req.params.id)
  const index = books.findIndex((u) => u.id === Id)
  if (index !== -1) {
    books.splice(index, 1)
    saveBooks(books)
    res.send(`Deleted book ${Id}`)
  } else {
    res.status(404).send('Book not found')
  }
})

app.listen(PORT, () => {
  console.log('Server running on PORT')
})

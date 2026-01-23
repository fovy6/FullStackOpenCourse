const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('content', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = "This person does not exist in the phonebook.";
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        persons = persons.filter(person => person.id !== id)
        response.statusMessage = "Person deleted successfully.";
        response.status(204).end()
    } else {
        response.statusMessage = "This person has already been deleted.";
        response.status(204).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Name or number is missing.' 
    })
    }
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
          error: 'Name must be unique.' 
        })
    }
    
    const newID = Math.floor(Math.random() * 10000)
    const newPerson = {
        id: newID.toString(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.get('/info', (request, response) => {
    const number_of_persons = persons.length
    const date = new Date()
    const htmlResponse = `<p>Phonebook has info for ${number_of_persons} people</p><p>${date}</p>`

    response.send(htmlResponse)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
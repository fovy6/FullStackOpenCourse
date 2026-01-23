const express = require('express')
const app = express()

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

app.get('/info', (request, response) => {
    const number_of_persons = persons.length
    const date = new Date()
    const htmlResponse = `<p>Phonebook has info for ${number_of_persons} people</p><p>${date}</p>`

    response.send(htmlResponse)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
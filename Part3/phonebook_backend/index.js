require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('content', (request, response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person
    .findById(id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.statusMessage = "No person found with this ID."
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'Malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person
    .findByIdAndDelete(id)
    .then(person => {
        if (person) {
            response.statusMessage = "Person successfully deleted."
            response.status(204).end()
        } else {
            response.statusMessage = "No person found with this ID."
            response.status(404).end()
        } 
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'Malformatted id' })
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Name or number is missing.' 
    })
    }
    
    const newID = Math.floor(Math.random() * 10000)
    const newPerson = new Person({
        id: newID.toString(),
        name: body.name,
        number: body.number
    })
    
    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/info', async (request, response) => {
    try{
        const persons = await Person.find({})
        const number_of_persons = persons.length
        const date = new Date()
        const htmlResponse = `<p>Phonebook has info for ${number_of_persons} people</p><p>${date}</p>`

        response.send(htmlResponse)
    } catch (error) {
        console.log(error)
        response.status(500).end()
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
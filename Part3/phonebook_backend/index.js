require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

// Use morgan middleware for logging
morgan.token('content', (request, response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => {
            next(error)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person
    .findById(id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person
    .findByIdAndDelete(id)
    .then(result => {
        response.statusMessage = "Person successfully deleted."
        response.status(204).end()
    })
    .catch(error => {
        next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) (
        next(error) 
    )
    
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

app.get('/info', async (request, response, next) => {
    try{
        const persons = await Person.find({})
        const number_of_persons = persons.length
        const date = new Date()
        const htmlResponse = `<p>Phonebook has info for ${number_of_persons} people</p><p>${date}</p>`

        response.send(htmlResponse)
    } catch (error) {
        next(error)
    }
})

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted id' })
    } else if (error.name === 'ReferenceError') {
        return response.status(400).send({ error: 'Missing name or number' })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
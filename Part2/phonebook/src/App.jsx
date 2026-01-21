import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const hook = () => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameAddition = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberAddition = (event) => (
    setNewNumber(event.target.value)
  )
  const handleFilter = (event) => (
    setFilterPerson(event.target.value)
  )

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterPerson.toLowerCase())
  )

  const duplicate = persons.find(person => person.name === newName)
  
  const showAlert = duplicate ? alert(`${newName} is already added to phonebook`) : false

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPerson={filterPerson} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameAddition={handleNameAddition} handleNumberAddition={handleNumberAddition} addPerson={addPerson} showAlert={showAlert} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
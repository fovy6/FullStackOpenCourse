import { useState, useEffect } from 'react'
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

  const handleUpdateNumber = (id, personObject) => {
  if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
    personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const duplicatePerson= persons.find(person => person.name === newName)
    if(duplicatePerson) {
      handleUpdateNumber(duplicatePerson.id, { ...duplicatePerson, number: newNumber })
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPerson={filterPerson} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameAddition={handleNameAddition} handleNumberAddition={handleNumberAddition} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} onDelete={(id) => setPersons(persons.filter(p => p.id !== id))} />
    </div>
  )
}

export default App
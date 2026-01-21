import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <PersonForm newName={newName} newNumber={newNumber} handleNameAddition={handleNameAddition} handleNumberAddition={handleNumberAddition} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
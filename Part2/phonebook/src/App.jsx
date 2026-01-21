import { useState } from 'react'
import PersonDetails from './components/PersonDetails'

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
      <div>
        filter shown with <input
          value={filterPerson}
          onChange={handleFilter}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNameAddition}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberAddition}
          />
        </div>
        <div>
            <button type="submit" onClick={() => {showAlert}}>
              add
            </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <PersonDetails key={person.id} person={person}/>
      )}
    </div>
  )
}

export default App
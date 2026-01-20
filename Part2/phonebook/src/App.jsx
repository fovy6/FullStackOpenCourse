import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameAddition = (event) => {
    setNewName(event.target.value)
  }

  const duplicate = persons.find(person => person.name === newName)
  
  const showAlert = duplicate ? alert(`${newName} is already added to phonebook`) : false

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
          name: 
          <input 
            value={newName} 
            onChange={handleNameAddition}
          />
        <div>
            <button type="submit" onClick={() => {showAlert}}>
              add
            </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Name key={person.name} person={person}/>
      )}
    </div>
  )
}

export default App
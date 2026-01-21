const PersonForm = ({ addPerson, newName, handleNameAddition, newNumber, handleNumberAddition, showAlert }) => (
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
)

export default PersonForm
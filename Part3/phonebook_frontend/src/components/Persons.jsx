import PersonDetails from './PersonDetails'
import DeleteButton from './DeleteButton'

const Persons = ({ personsToShow, onDelete }) => {
    return <div>
        {personsToShow.map(person => (
            <div key={person.id}>
                <PersonDetails key={person.id} person={person}/> <DeleteButton person={person} onDelete={onDelete} />
            </div>
        )
        )}
    </div>
}

export default Persons
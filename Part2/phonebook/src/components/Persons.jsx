import PersonDetails from './PersonDetails'

const Persons = ({ personsToShow }) => {
    return <div>
        {personsToShow.map(person =>
        <PersonDetails key={person.id} person={person}/>
        )}
    </div>
}

export default Persons
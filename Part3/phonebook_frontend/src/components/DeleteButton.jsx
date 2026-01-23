import PersonService from "../services/persons"

const DeleteButton = ({ person, onDelete }) => {
    const handleDelete = (id) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            PersonService
                .remove(id)
                .then(() => onDelete(id))
                .catch(error => {
                    alert(`the person '${person.name}' was already deleted from server`)
                })
        }
    }
    return <button onClick={() => handleDelete(person.id)}>delete</button>
}

export default DeleteButton
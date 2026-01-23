const Filter = ({ filterPerson, handleFilter}) => (    
    <div>
        filter shown with <input
          value={filterPerson}
          onChange={handleFilter}
        />
    </div>
)

export default Filter
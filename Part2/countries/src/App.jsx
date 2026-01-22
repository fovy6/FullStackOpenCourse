import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries)
      })
  }, []) 

  const handleChange = (event) => {
    setValue(event.target.value)

    const filterCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setCountries(filterCountries)
  }
  
  return (
    <div>
      find countries <input 
       value={value}
       onChange={handleChange}
      />
      <CountryList countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App
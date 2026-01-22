import Country from './Country'

const CountryList = ({ countries, setCountries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length > 1 && countries.length <= 10) {
        return countries.map(country =>
            <div key={country.name.common}>
                {country.name.common} <button onClick={()=> setCountries([country])}>Show</button>
            </div>
        )
    }
    else if (countries.length === 1) {
        const country = countries[0]
        return <Country country={country} />
    }
    else {
        return <div>No matches found</div>
    }
}

export default CountryList
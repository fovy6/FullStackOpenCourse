const CountryList = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length > 1 && countries.length <= 10) {
        return countries.map(country =>
            <div key={country.name.common}>
                {country.name.common}
            </div>
        )
    }
    else if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>Capital: {country.capital}</div>
                <div>Area: {country.area}</div>
                <h3>Languages:</h3>
                <ul>
                    {Object.values(country.languages).map(language =>
                        <li key={language}>{language}</li>
                    )}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
            </div>
        )
    }
    else {
        return <div>No matches found</div>
    }
}

export default CountryList
import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import CountryMatchList from "./components/CountryMatchList.jsx";
import CountryDetails from "./components/CountryDetails.jsx";
import countriesService from "./services/countries.js";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setAllCountries(data);
    });
  }, []);

  if (allCountries == null) {
    return null;
  }

  // This version search also in the translated names of the countries and shows separate results for them
  const filteredCountries = [];
  const filteredTranslatedCountries = [];

  Object.entries(allCountries).forEach(([country, { namesLC }]) => {
    const countryLC = country.toLowerCase();
    const searchLC = search.toLowerCase();

    if (countryLC.includes(searchLC)) {
      filteredCountries.push(country);
    } else {
      const filteredNames = namesLC.filter((name) => name.includes(searchLC));
      if (filteredNames.length) {
        filteredTranslatedCountries.push(
          `${country} (${filteredNames.join(", ")})`,
        );
      }
    }
  });

  return (
    <>
      <div>
        <Search search={search} setSearch={setSearch} />
      </div>

      <div style={{ padding: "1em 0" }}>
        {search ? (
          filteredCountries.length == 1 ? (
            <CountryDetails data={allCountries[filteredCountries[0]]} />
          ) : (
            <CountryMatchList names={filteredCountries} limit={10} />
          )
        ) : (
          <i>Specify a filter</i>
        )}
      </div>

      {filteredTranslatedCountries.length ? (
        <>
          <hr />
          <div style={{ padding: "1em 0" }}>
            <h2 style={{ fontSize: "1em" }}>
              Suggested coutries from matched translated names
            </h2>
            <CountryMatchList names={filteredTranslatedCountries} limit={10} />
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;

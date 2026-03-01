import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .then((data) => extractDataFromAll(data));
};

const extractDataFromAll = (data) => {
  const countriesData = {};

  data.forEach((d) => {
    // Create a Set with all possible names for each country
    // This includes the official and common name, as well as its translations
    // This allows to search for a country even by names in other languages
    // By using a Set, duplicates are removed and optimized lookup
    const allNamesSet = new Set([
      d.name.common.toLowerCase(),
      d.name.official.toLowerCase(),
    ]);

    Object.values(d.translations).forEach((t) => {
      allNamesSet.add(t.common.toLowerCase());
      allNamesSet.add(t.official.toLowerCase());
    });

    countriesData[d.name.common] = {
      name: d.name.common,
      capital: d.capital,
      languages: d.languages && Object.values(d.languages),
      area: d.area,
      flags: d.flags,
      namesLC: [...allNamesSet],
    };
  });

  return countriesData;
};

export default { getAll };

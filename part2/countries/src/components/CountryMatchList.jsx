import CountryMatchItem from "./CountryMatchItem.jsx";

const CountryMatchList = ({ names, limit = 1000, onResultShowButtonClick }) => {
  if (names.length <= limit) {
    if (names.length > 0) {
      return (
        <ul>
          {names.map((name) => (
            <CountryMatchItem
              name={name}
              key={name}
              onResultShowButtonClick={onResultShowButtonClick}
            />
          ))}
        </ul>
      );
    } else {
      return <i>No match</i>;
    }
  } else {
    return <i>Too many matches ({names.length}), specify another filter</i>;
  }
};

export default CountryMatchList;

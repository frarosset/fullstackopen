const CountryMatchItem = ({ name, onResultShowButtonClick }) => (
  <li>
    {name}{" "}
    {onResultShowButtonClick ? (
      <button type="button" onClick={onResultShowButtonClick(name)}>
        Show
      </button>
    ) : null}
  </li>
);

export default CountryMatchItem;

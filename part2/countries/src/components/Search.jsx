const Search = ({ search, setSearch }) => {
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <label>find countries </label>
      <input type="search" value={search} onChange={onChange} />
    </div>
  );
};

export default Search;

import ControlledInput from "./ControlledInput";

const SearchFilter = ({ search, setSearch }) => {
  const onChangeSearchHandle = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      filter shown with:
      <ControlledInput value={search} onChange={onChangeSearchHandle} />
    </div>
  );
};

export default SearchFilter;

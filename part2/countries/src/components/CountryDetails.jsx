const CountryDetails = ({ data }) => {
  if (data == null) {
    return null;
  }

  return (
    <div>
      <h1>{data.name}</h1>

      <p>Capital {data.capital}</p>
      <p>Area {data.area}</p>

      <h2>Languages</h2>
      <ul>
        {data.languages.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      <img
        style={{ width: "100%", maxWidth: "500px", border: "1px solid black" }}
        src={data.flags.png}
        alt={data.flags.alt}
      />
    </div>
  );
};

export default CountryDetails;

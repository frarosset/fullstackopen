const ControlledInput = ({ value, onChange, required = false }) => (
  <input value={value} onChange={onChange} required={required} />
);

export default ControlledInput;

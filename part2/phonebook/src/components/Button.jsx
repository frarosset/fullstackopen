const Button = ({ label, onClick, type = "button" }) => (
  <button onClick={onClick} type={type}>
    {label}
  </button>
);

export default Button;

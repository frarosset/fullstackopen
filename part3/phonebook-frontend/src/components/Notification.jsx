const Notification = ({ message }) => {
  const style = {
    backgroundColor: "lightgrey",
    border: "2px solid",
    borderRadius: "5px",
    fontSize: "1.2rem",
    padding: "5px",
    margin: "20px 0",
  };

  const styleType = {
    success: { color: "green", borderColor: "green" },
    error: { color: "red", borderColor: "red" },
  };

  if (message == null) {
    return null;
  }

  return (
    <div style={{ ...style, ...styleType[message.type] }}>{message.text}</div>
  );
};

export default Notification;

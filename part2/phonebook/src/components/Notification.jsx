const Notification = ({ message }) => {
  const style = {
    backgroundColor: "lightgrey",
    color: "green",
    border: "2px solid green",
    borderRadius: "5px",
    fontSize: "1.2rem",
    padding: "5px",
    margin: "20px 0",
  };

  if (message == null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;

import errorImg from "./error.gif";

const ErrorMasseg = () => {
  return (
    <img
      style={{
        dispay: "block",
        width: "250px",
        height: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      src={errorImg}
      alt="error"
    />
  );
};

export default ErrorMasseg;

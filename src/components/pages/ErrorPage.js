import ErrorMasseg from "../errorMessag/ErrorMasseg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <ErrorMasseg />
      <Link style={{ color: "red", borderBottom: "1px solid" }} to="/">
        Back to mail page
      </Link>
    </div>
  );
};

export default ErrorPage;

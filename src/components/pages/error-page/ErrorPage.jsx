import { Link, useRouteError } from "react-router-dom";
import { errorPage } from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={errorPage} data-testid="ErrorPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        Go back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default ErrorPage;

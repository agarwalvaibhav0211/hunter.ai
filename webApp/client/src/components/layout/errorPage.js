import { useRouteError } from "react-router-dom";

export default function ErrorPage(props) {
  const error = useRouteError();
  console.error(error);
    if(props.errorMessage){
        return (
            <div id="error-page">
                <h1>Oops!</h1>
                <p>{props.errorMessage}</p>
                <p>
                <i>{error.statusText || error.message}</i>
                </p>
            </div>
            );
    }
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
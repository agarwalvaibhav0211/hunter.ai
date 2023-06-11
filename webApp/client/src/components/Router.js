import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ErrorPage from "./layout/errorPage";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        errorElement:<ErrorPage/>
    },
]);

export function Router(props){
   return (<RouterProvider router={router} />)
}
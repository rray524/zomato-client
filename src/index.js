import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import SingleRestaurant from "./pages/SingleRestaurant";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPage from "./pages/AdminPage";
// import axios from "axios";

// axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/restaurants/:id",
    element: <SingleRestaurant />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </>
);

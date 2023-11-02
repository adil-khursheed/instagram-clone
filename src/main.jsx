import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store.js";

import { ProtectedRoute } from "./components/index.js";

import {
  LoginPage,
  SignUpPage,
  HomePage,
  SearchPage,
  ExplorePage,
  MessagesPage,
  ProfilePage,
  EditProfilePage,
  NotificationsPage,
  CreatePost,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
          {
            path: "/explore",
            element: <ExplorePage />,
          },
          {
            path: "/messages",
            element: <MessagesPage />,
          },
          {
            path: "/:username",
            element: <ProfilePage />,
          },
          {
            path: "/edit-profile",
            element: <EditProfilePage />,
          },
          {
            path: "/notifications",
            element: <NotificationsPage />,
          },
          {
            path: "/create-post",
            element: <CreatePost />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

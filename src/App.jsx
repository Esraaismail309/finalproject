import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayOut from "./Pages/MainLayOut/MainLayOut";
import Cart from "./Pages/Cart/Cart";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import CounterContextProvider from "./Context/CounterContext/CounterContext";
import UserContextProvider from "./Context/UserContext/UserContext";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { Offline, Online } from "react-detect-offline";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },

        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <Offline>
        <div className="bg-red-200 p-2 shadow absolute bottom-1 right-2 z-50">
          <i className="fa-solid fa-wifi"></i> Only shown when you're offline
        </div>
      </Offline>

      <CounterContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CounterContextProvider>
    </UserContextProvider>
  );
}

export default App;

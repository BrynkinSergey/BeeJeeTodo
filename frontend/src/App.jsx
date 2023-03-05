import './App.css';
import {MainPage} from "./pages/MainPage";
import {
  createBrowserRouter, Link,
  RouterProvider,
} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<MainPage/>),
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;

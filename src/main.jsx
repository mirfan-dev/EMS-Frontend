import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,  RouterProvider} from "react-router-dom";
import ListEmployeeComponent from './components/ListEmployeeComponent.jsx';
import CreateEmployee from './components/CreateEmployee.jsx';
import ReadEmployee from './components/ReadEmployee.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ListEmployeeComponent /> },
      { path: "create-employee", element: <CreateEmployee /> },
      { path: "edit-employee/:id", element: <CreateEmployee /> },
      {path:"/read/:id", element:<ReadEmployee />},

    ],
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

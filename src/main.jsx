import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DocList from './components/DocList.jsx'
import AddDoc from './components/AddDoc.jsx'

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <DocList/>,
      },
      {
        path: "/upload",
        element: <AddDoc/>
      },
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRoute}/>
  </StrictMode>,
)

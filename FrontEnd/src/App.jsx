import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'

import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'


function App() {

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])

  return (
  <RouterProvider router={router}>

  </RouterProvider>
  )
}

export default App

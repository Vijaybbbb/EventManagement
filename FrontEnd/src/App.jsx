import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'

import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup'
import Admin from './Pages/Admin/Admin'
import MyTickets from './Pages/MyTickets/MyTickets'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'



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
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/admin",
    element:<Admin/>
  },
  {
    path:"/myTickets",
    element:<MyTickets/>
  },
  {
    path:"/adminLogin",
    element:<AdminLogin/>
  },

])

  return (
  <RouterProvider router={router}>

  </RouterProvider>
  )
}

export default App

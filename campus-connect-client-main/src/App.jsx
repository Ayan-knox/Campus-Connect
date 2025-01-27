import React from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Chat from './pages/Chat'
import ProtectedRoute from './utils/ProtectedRoute'
import CheckAuthentication from './utils/CheckAuthentication'


const newRoutes = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" >
      
      <Route index element={<Home />} />

      <Route path='user' element={<CheckAuthentication />}>

        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />

      </Route>


      <Route element={<ProtectedRoute />}>

        <Route path='chat' element={<Chat />} />

      </Route>


    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider
      router={newRoutes}
    />
  )
}

export default App
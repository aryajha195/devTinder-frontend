import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import appStore from './utils/appStore'
import { Provider } from 'react-redux'
import Feed from './Components/Feed'
import Profile from './Components/Profile'
import Connections from './Components/Connections'
import Requests from './Components/Requests'
import Register from './Components/Register'

function App() {
 
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<Body />} >
              <Route path="/login" element={<Login />} />
              <Route path="" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

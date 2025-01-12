import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'
import appStore from './utils/appStore'
import { Provider } from 'react-redux'

function App() {
 
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<Body />} >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

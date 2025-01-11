import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './Components/Body'
import Login from './Components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

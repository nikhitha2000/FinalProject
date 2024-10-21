// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login  from './Components/Login';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
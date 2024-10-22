// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login  from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
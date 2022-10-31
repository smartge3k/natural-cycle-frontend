import React, { Component } from 'react'
import './App.css'
import Authentication from './components/authenticate'
import Dashboard from './components/dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

class App extends Component<any, any> {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/authenticate" element={<Authentication />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

import React from 'react'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MyState from './context/MyState.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyState>
      <Router>
        <App />
      </Router>
    </MyState>
  </React.StrictMode>,
)

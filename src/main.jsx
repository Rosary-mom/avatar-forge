import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'   // ← make sure the A is capital, exactly like the filename

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

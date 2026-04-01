import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Global reset
const style = document.createElement('style');
style.innerHTML = `body { margin: 0; padding: 0; overflow: hidden; height: 100vh; width: 100vw; }`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

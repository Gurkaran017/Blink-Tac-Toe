
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SoundProvider } from './context/SoundContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </React.StrictMode>
)
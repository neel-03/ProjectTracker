import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomProvider theme='light'>
      <App />
    </CustomProvider>
  </React.StrictMode>,
)

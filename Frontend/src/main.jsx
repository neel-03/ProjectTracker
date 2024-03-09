import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CustomProvider } from "rsuite";
import { Provider } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomProvider theme='light'>
      <Provider store={store}>
      <App />
      </Provider>
    </CustomProvider>
  </React.StrictMode>,
)

import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
// Import our custom CSS
// import '../scss/main.scss'
// import '../src/scss/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
   </React.StrictMode>,
)

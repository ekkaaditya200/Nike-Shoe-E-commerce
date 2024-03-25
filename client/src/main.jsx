import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Store from './app/Store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

let persistor = persistStore(Store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <App />
    </PersistGate>
  </Provider>,
)

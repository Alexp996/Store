import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';


import './index.css';
import App from './App';
 
import { CartProvider } from './contexts/cart.context';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        {/* the store inside of store object is from store directory, the func store */}
        <BrowserRouter>
              <CartProvider>
                <App />
              </CartProvider>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();

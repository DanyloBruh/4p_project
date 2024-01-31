import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

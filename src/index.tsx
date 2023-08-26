import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Добавьте этот импорт
import { store } from './app/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    {' '}
    {/* Оберните компонент в Provider и передайте store */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();

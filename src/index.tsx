import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createClient, 
  Provider 
} from 'urql';
import App from './Components/App';
import './Definitions/i18n';

const client = createClient({
  url: 'https://api.spacex.land/graphql/'
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>
);
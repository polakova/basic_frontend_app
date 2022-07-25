import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createClient, 
  Provider 
} from 'urql';
import App from './Components/App';
import './Definitions/i18n';
import { themeDark } from './Styles/Theme';

const client = createClient({
  url: 'https://api.spacex.land/graphql/'
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <ThemeProvider theme={themeDark}>
        <CssBaseline enableColorScheme/>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
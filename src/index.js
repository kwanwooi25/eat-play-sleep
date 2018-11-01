/** Core Dependancies */
import React from 'react';
import ReactDOM from 'react-dom';

/** Redux */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

/** Multilingual */
import { IntlProvider } from 'react-redux-multilingual';
import translations from './translations';

/** Material UI */
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

/** Material UI Picker */
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import 'moment/locale/ko';

/** Service Worker */
import * as serviceWorker from './serviceWorker';

/** Components */
import App from './containers/App';

/** Styles */
import './styles/index.scss';

const locale = window.navigator.language.slice(0, 2) === 'ko' ? 'ko' : 'en';

// create Redux + Multilingual store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  { Intl: { locale: locale } },
  composeEnhancers(applyMiddleware(reduxThunk))
);

// customize Material UI Theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7986CB',
      main: '#3F51B5',
      dark: '#303F9F',
      contrastText: '#fff'
    },
    secondary: {
      light: '#FFD86A',
      main: '#FBC658',
      dark: '#D19C2E',
      contrastText: '#fff'
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Noto Sans KR',
      'sans-serif'
    ].join(',')
  }
});

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider translations={translations}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
          <App/>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

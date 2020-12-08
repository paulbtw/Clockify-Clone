import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import theme from './theme';
import configureStore from './store/configureStore';
import { SnackbarProvider } from 'notistack';
import { CookieNotification, GoogleAnalytics, ScrollReset } from './components';

const store = configureStore();

const App: React.FC = () => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SnackbarProvider maxSnack={3} autoHideDuration={2000}>
				<Router>
					<ScrollReset />
					<GoogleAnalytics />
					<CookieNotification />
					<Routes />
				</Router>
			</SnackbarProvider>
		</ThemeProvider>
	</Provider>
);

export default App;

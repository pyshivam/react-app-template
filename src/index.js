import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import * as serviceWorker from './serviceWorker';
import { store } from 'state/store';
import history from './history';
import firebase from 'config/firebase';
import { rrfConfig } from 'config/reactReduxFirebase';
import { theme } from 'views/UI/theme';

import './index.css';
import { App } from 'views/routes';

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance, // <- needed if using firestore
};

render(
	<React.StrictMode>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<ThemeProvider theme={theme}>
					<Router history={history}>
						<App />
					</Router>
				</ThemeProvider>
			</ReactReduxFirebaseProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import { CssBaseline } from '@material-ui/core';

// Create new bundle file for Home
const Home = loadable(() => import('views/pages/Home'));

const App = (props) => {
	return (
		<BrowserRouter>
			<CssBaseline />

			<Switch>
				<Route path='/' component={Home} />

				<Route path='*'>
					<Redirect to='/' />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;

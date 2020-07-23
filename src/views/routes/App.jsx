import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { Home } from 'views/pages';

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

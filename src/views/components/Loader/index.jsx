import React, { Component } from 'react';
import {
	CssBaseline,
	Fade,
	CircularProgress,
	withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '300px',
		width: '100%',
		flexDirection: 'column',
	},
	loader: {
		transitionDelay: '400ms',
	},
});

class Loader extends Component {
	render() {
		const { classes } = this.props;
		return (
			<CssBaseline>
				<div className={classes.root}>
					<Fade in={true} className={classes.loader} unmountOnExit>
						<CircularProgress />
					</Fade>
				</div>
			</CssBaseline>
		);
	}
}

export default withStyles(styles)(Loader);

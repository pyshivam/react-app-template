import React, { Component } from 'react';
import { Fade, CircularProgress, withStyles } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: '100%',
		flexDirection: 'column',
	},
	loader: {
		transitionDelay: '400ms',
		marginTop: '20px',
	},
	title: {
		fontSize: '42px',
		fontWeight: '700',
		letterSpacing: '0',
		color: '#022B3A',
	},
	subTitle: {
		fontSize: '2p8x',
		letterSpacing: '0',
		color: '#022B3A',
	},
});

class SplashScreen extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.title}>Title</div>
				<div className={classes.subTitle}>Sub Title Goes Here</div>
				<Fade in={true} className={classes.loader} unmountOnExit>
					<CircularProgress />
				</Fade>
			</div>
		);
	}
}

export default withStyles(styles)(SplashScreen);

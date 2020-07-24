import React, { Component } from 'react';
import { CircularProgress, Box } from '@material-ui/core';

class SplashScreen extends Component {
	constructor(props) {
		super(props);
		this.domRef = React.createRef();
	}

	render() {
		return (
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				height='100vh'
				width='100%'
				ref={this.domRef}>
				<Box fontSize='42px' fontWeight='700' color='#022B3A'>
					Gaadiwala
				</Box>
				<Box>Get you package delivered</Box>
				<CircularProgress
					style={{
						transitionDelay: '400ms',
						marginTop: '20px',
					}}
				/>
			</Box>
		);
	}
}

export default SplashScreen;

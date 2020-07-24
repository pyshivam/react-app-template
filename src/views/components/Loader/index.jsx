import React, { Component } from 'react';
import { CircularProgress, Box } from '@material-ui/core';

class Loader extends Component {
	render() {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='300px'
				width='100%'
				flexDirection='column'>
				<CircularProgress
					style={{
						transitionDelay: '400ms',
					}}
				/>
			</Box>
		);
	}
}

export default Loader;

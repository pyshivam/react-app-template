import React, { Component } from 'react';
import { Box } from '@material-ui/core';

class NotFound extends Component {
	render() {
		return (
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				width='100%'
				height='50vmin'>
				<Box color='rgba(0,0,0,0.5)' fontSize='5em'>
					404
				</Box>
				<Box fontSize='1.2em'>
					Not Found; This is not the page you’re looking for.
				</Box>
			</Box>
		);
	}
}

export default NotFound;

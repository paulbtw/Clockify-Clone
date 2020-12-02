import { AppBar, Box, Button, Container, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Nav: React.FC = () => (
	<AppBar position='static'>
		<Container maxWidth='lg'>
			<Toolbar>
				<Button component={RouterLink} to='/' color='inherit'>
					Home
				</Button>
				<Box flexGrow={1} />
				<Button component={RouterLink} to='/login' color='inherit'>
					Login
				</Button>
				<Button component={RouterLink} to='/register' color='inherit'>
					Register
				</Button>
			</Toolbar>
		</Container>
	</AppBar>
);

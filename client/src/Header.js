import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

function Header() {
	return (
		<ButtonGroup
			size='large'
			variant='contained'
			color='primary'
			aria-label='contained primary button group'
		>
			<Button href='https://nvnsaharan.netlify.app/' target='_blank'>
				Portfolio
			</Button>
			<Button href='https://github.com/nvnsaharan' target='_blank'>
				Github
			</Button>
			<Button
				href='https://www.linkedin.com/in/nvnsaharan/'
				target='_blank'
			>
				LinkedIn
			</Button>
		</ButtonGroup>
	);
}

export default Header;

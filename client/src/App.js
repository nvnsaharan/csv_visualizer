import React from 'react';
import './App.css';
import Header from './Header';
import SimpleTabs from './Tabs';

function App() {
	//https://vizualizerserver.herokuapp.com/

	return (
		<div className='App'>
			<div className='header'>
				<Header />
			</div>
			<SimpleTabs className='Simpletabs' />
		</div>
	);
}

export default App;

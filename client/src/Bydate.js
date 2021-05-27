import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import './App.css';
import PChart from './pChart';

function Bydate() {
	const [data, setdata] = useState([]);
	const [keys, setKeys] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [selectedkey, setSelectedkey] = useState('08/01/2015');

	const handleclick = (e) => {
		setSelectedkey(e);
	};

	const fetchData = () => {
		fetch('https://vizualizerserver.herokuapp.com/date', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setdata(data);
				setKeys(Object.keys(data));
				let data1 = {};
				for (let index = 0; index < data[selectedkey].length; index++) {
					const element = data[selectedkey][index];
					if (data1[element['Product']]) {
						data1[element['Product']] += element['Bugs'];
					} else {
						data1[element['Product']] = element['Bugs'];
					}
				}
				setChartData(data1);
			})
			.catch(console.log);
	};
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		let data1 = {};
		if (keys.length > 0) {
			for (let index = 0; index < data[selectedkey].length; index++) {
				const element = data[selectedkey][index];
				if (data1[element['Product']]) {
					data1[element['Product']] += element['Bugs'];
				} else {
					data1[element['Product']] = element['Bugs'];
				}
			}
		}
		setChartData(data1);
	}, [selectedkey]);

	return (
		<div className='tabpage'>
			<MenuList className='menubar'>
				{keys.map((topic, index) => (
					<MenuItem
						className='menuitem'
						key={index}
						onClick={() => handleclick(topic)}
					>
						{topic}
					</MenuItem>
				))}
			</MenuList>
			<div className='graphpage'>
				<PChart data={chartData} />
			</div>
		</div>
	);
}

export default Bydate;

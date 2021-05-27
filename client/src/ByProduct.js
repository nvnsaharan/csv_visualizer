import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import './App.css';
import PieChart from './PieChart';

function ByProduct() {
	const [data, setdata] = useState([]);
	const [keys, setKeys] = useState([]);
	const [chartdata, setChartdata] = useState([]);
	const [selectedkey, setSelectedkey] = useState('Arista Router');

	const handleclick = (e) => {
		setSelectedkey(e);
	};

	const fetchData = () => {
		fetch('https://vizualizerserver.herokuapp.com/', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setdata(data);
				setKeys(Object.keys(data));
				let data1 = {};
				if (Object.keys(data).length > 0) {
					for (
						let index = 0;
						index < data[selectedkey].length;
						index++
					) {
						const element = data[selectedkey][index];
						if (data1[element['date']]) {
							data1[element['date']] += element['Bugs'];
						} else {
							data1[element['date']] = element['Bugs'];
						}
					}
				}
				setChartdata(data1);
			})
			.catch(console.log);
	};
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		let data1 = {};
		if (Object.keys(data).length > 0) {
			for (let index = 0; index < data[selectedkey].length; index++) {
				const element = data[selectedkey][index];
				if (data1[element['date']]) {
					data1[element['date']] += element['Bugs'];
				} else {
					data1[element['date']] = element['Bugs'];
				}
			}
		}
		setChartdata(data1);
	}, [selectedkey]);

	return (
		<div className='tabpage'>
			<MenuList className='menubar' defaultValue='0'>
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

			<div className='graphpage2'>
				<PieChart data={chartdata} />
			</div>
		</div>
	);
}

export default ByProduct;

import React, { useEffect, useState } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import './App.css';

function Total() {
	const [data, setdata] = useState([]);
	const [keyss, setKeys] = useState([]);
	const COLORS = [
		'#9400D3',
		'#0000FF',
		'#00FF00',
		'#4B0082',
		'#FFFF00',
		'#FF7F00',
		'#FF0000',
	];

	const fetchData = () => {
		fetch('https://vizualizerserver.herokuapp.com/', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setKeys(Object.keys(data));
			})
			.catch(console.log);
		fetch('https://vizualizerserver.herokuapp.com/date', {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				const data1 = [];
				const kay = Object.keys(data);
				for (let index = 0; index < kay.length; index++) {
					const element = data[kay[index]];
					const dt = { name: kay[index] };
					for (let index = 0; index < element.length; index++) {
						const ele = element[index];
						if (dt[ele['Product']]) {
							dt[ele['Product']] += ele['Bugs'];
						} else {
							dt[ele['Product']] = ele['Bugs'];
						}
					}

					data1.push(dt);
				}
				setdata(data1);
			})
			.catch(console.log);
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className='graphpage1'>
			<LineChart width={800} height={500} data={data}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' padding={{ left: 30, right: 30 }} />
				<YAxis />
				<Tooltip />
				<Legend />
				{keyss.map((topic, index) => (
					<Line
						type='monotone'
						key={index}
						dataKey={topic}
						stroke={COLORS[index]}
					/>
				))}
			</LineChart>
		</div>
	);
}

export default Total;

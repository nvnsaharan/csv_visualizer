import React from 'react';
import {
	PieChart,
	Pie,
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

const COLORS = [
	'#FF0000',
	'#9400D3',
	'#0000FF',
	'#00FF00',
	'#4B0082',
	'#FFFF00',
	'#FF7F00',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill='white'
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline='central'
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

function PChart(props) {
	const data = [];
	const keys = Object.keys(props.data);
	for (let index = 0; index < keys.length; index++) {
		const element = keys[index];
		const dt = { name: element, value: props.data[element] };
		data.push(dt);
	}
	return (
		<div className='twocharts'>
			<div className='onechart'>
				<PieChart width={400} height={400}>
					<Pie
						data={data}
						cx='50%'
						cy='50%'
						labelLine={false}
						label={renderCustomizedLabel}
						fill='#8884d8'
						dataKey='value'
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</div>
			<div className='onechart'>
				<BarChart
					width={400}
					height={400}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />

					<Bar dataKey='value' fill='#3f51b5' />
				</BarChart>
			</div>
		</div>
	);
}

export default PChart;

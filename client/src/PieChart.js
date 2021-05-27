import React from 'react';
import { Line } from 'react-chartjs-2';
var LineChart = Line;

function PieChart(data) {
	const chart_labels = Object.keys(data.data);
	const chart_data = [];
	for (let index = 0; index < chart_labels.length; index++) {
		const element = chart_labels[index];
		chart_data.push(data.data[element]);
	}
	var chartOptions = {
		showScale: true,
		pointDot: true,
		showLines: false,
		title: {
			display: true,
			text: 'Chart.js Line Chart',
		},
		legend: {
			display: true,
			labels: {
				boxWidth: 50,
				fontSize: 10,
				fontColor: '#bbb',
				padding: 5,
			},
		},
	};

	var chartData = {
		labels: chart_labels,
		datasets: [
			{
				label: 'Bugs',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.5)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				data: chart_data,
			},
		],
	};

	return (
		<div className=''>
			<LineChart data={chartData} options={chartOptions} />
		</div>
	);
}
export default PieChart;

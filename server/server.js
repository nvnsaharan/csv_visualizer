const CSVToJSON = require('csvtojson');
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

let data = {};
let data2 = {};
CSVToJSON()
	.fromFile('data.csv')
	.then((users) => {
		for (let index = 0; index < users.length; index++) {
			const element = users[index];
			if (data2[element['Date;'].slice(0, 10)]) {
				var date = element['Date;'].slice(0, 10);
				data2[date].push({
					Product: element['Product Name;'].slice(
						0,
						element['Product Name;'].length - 1
					),
					Bugs: Number(element['Number Of Bugs']),
				});
			} else {
				var date = element['Date;'].slice(0, 10);
				data2[date] = [
					{
						Product: element['Product Name;'].slice(
							0,
							element['Product Name;'].length - 1
						),
						Bugs: Number(element['Number Of Bugs']),
					},
				];
			}
			////////////////////////////
			if (
				data[
					element['Product Name;'].slice(
						0,
						element['Product Name;'].length - 1
					)
				]
			) {
				var product = element['Product Name;'].slice(
					0,
					element['Product Name;'].length - 1
				);
				data[product].push({
					date: element['Date;'].slice(0, 10),
					Bugs: Number(element['Number Of Bugs']),
				});
			} else {
				var product = element['Product Name;'].slice(
					0,
					element['Product Name;'].length - 1
				);
				data[product] = [
					{
						date: element['Date;'].slice(0, 10),
						Bugs: Number(element['Number Of Bugs']),
					},
				];
			}
		}
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/', (req, res) => {
	res.json(data);
});

app.get('/date', (req, res) => {
	res.json(data2);
});
app.listen(port);

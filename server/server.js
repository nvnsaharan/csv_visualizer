const CSVToJSON = require('csvtojson');
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

let data;

CSVToJSON()
	.fromFile('data.csv')
	.then((users) => {
		data = users;
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/', (req, res) => {
	res.json(data);
});
app.listen(port);

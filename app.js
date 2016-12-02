let express = require('express')
let app = express()
let mysql = require('mysql')

//Params for BDD connection
let connection = mysql.createConnection({
	host: 'localhost',
	user: '',
	password: ''
})

connection.connect()

//CREATION OF BDD
connection.query("CREATE DATABASE IF NOT EXISTS test_test")
connection.query("USE test_test")
//CREATION OF people TABLE
connection.query("CREATE TABLE IF NOT EXISTS people (name  varchar(35),age float);")

//INSERTION INTO people TABLE
connection.query("INSERT INTO people(name, age) VALUES ('Benoit','26'),('Guillaume','28'),('Francois','28'),('Minh','22'),('Theo','20'),('Mark','31'),('Bill','59'),('Warren','84'),('Larry','42');")

app.get('/user', (req, res) => {

	let sql = 'SELECT name, age FROM people WHERE name = ' + connection.escape(req.query.name)

	connection.query(sql, (err, results) => {
		if (results.length === 0) {
			res.status(203).json({
				error: "NO DATA :("
			})
		} else {
				res.status(200).json({
				name: results[0].name,
				age: results[0].age
			})
		}
	})
})

.listen(8080, () => {
	console.log('THE API LISTEN ON htpp://localhost:8080/')
})

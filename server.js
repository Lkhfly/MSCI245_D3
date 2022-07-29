let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req,res) => {
	let connection = mysql.createConnection(config)
	let sql = `SELECT id, name, year, quality FROM movies`

	connection.query(sql,(error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
})
app.post('/api/loadMovieTrailers', (req,res)=>{
	let connection = mysql.createConnection(config)
	let sql = `
	SELECT name FROM movies
	WHERE trailers IS NOT NULL`

	connection.query(sql,(error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
})
app.post ('/api/searchMovieTrailers', (req,res) => {
	let connection = mysql.createConnection(config)
	let sql = 
	`select trailers from movies
	where name = ?;`
	let {title} = req.body
	let data = [title]
	connection.query(sql,data,(error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
})
app.post('/api/searchMovies',(req,res)=>{
	let connection = mysql.createConnection(config)
	let sql =
`
SELECT DISTINCT movies.name,directors.first_name,directors.last_name
FROM movies,directors, movies_directors, actors, roles, Review
WHERE  movies.id = movies_directors.movie_id
AND directors.id = movies_directors.director_id
AND roles.movie_id = movies.id
AND roles.actor_id = actors.id
AND movies.name LIKE ?
AND actors.first_name LIKE ?
AND actors.last_name LIKE ?
AND directors.first_name LIKE ?
AND directors.last_name LIKE ?
`
	let {title,actorFirstName,actorLastName,directorFirstName,directorLastName} = req.body
	let data = [title,actorFirstName,actorLastName,directorFirstName,directorLastName]
	connection.query(sql,data,(error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
})
app.post('/api/addReview', (req,res) => {
	let connection = mysql.createConnection(config)
	let sql = `INSERT INTO Review(reviewTitle, reviewContent, reviewScore, User_userID, movies_id) VALUES(?,?,?,?,?)`;
	let {reviewTitle,reviewContent,reviewScore, User_userID, movies_id} = req.body
	let data = [reviewTitle,reviewContent,reviewScore, User_userID, movies_id]
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		console.log("Success")
	});
	connection.end();
})
app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



// app.listen(port, () => console.log(`Listening on port ${port}`))
app.listen(port, '172.31.31.77') //for the deployed version, specify the IP address of the server

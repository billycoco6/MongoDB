var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.json('Hello World')
})

var data = {
	elephant: {hp:100, mp: 100, strength: 88, special: "Gwarrrr"},
	wolf: {hp: 50, mp: 200, strength: 68, special: "Wufff"},
}

app.get('/tamagotchi/:name', function(req, res) {
	var name = req.params.name
	if (! (name in data) ) {
		res.sendStatus(400)
	}
	console.log('get info', name)
	res.json(data[name])
})

app.post('/tamagotchi/hit/:name', function(req, res) {
	var damage = req.body.damage
	var name = req.params.name
	if (! (name in data) ) {
		res.sendStatus(400)
	}
	data[name].hp =  data[name].hp - damage
	res.json(data[name])
})

app.listen(3000)
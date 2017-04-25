var todos = require('./todos.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

// retrieves todo list
app.get('/todos', function (request, response) {
  response.json(todos)
})

// retrieves specific todo item
app.get('/todos/:id', function (request, response) {
  if (!todos[request.params.id]) {
    response.status(404).end('Oops! There is no task for ' + request.params.id)
    return
  }
  response.json(todos[request.params.id])
})

// adds new todo item
app.post('/todos', function (request, response) {
  var id = request.body.task.trim().toLowerCase().split(' ').join('-')
  todos[id] = {
    task: request.body.task.trim(),
    isDone: request.body.isDone
  }
  response.redirect('/todos/' + id)
})

// deletes todo item
app.delete('/todos/:id', function (request, response) {
  delete todos[request.params.id]
  response.redirect('/todos')
})

// updates todo item
app.put('/todos/:id', function (request, response) {
  var product = todos[request.params.id]
  if (request.body.task !== undefined) {
    product.task = request.body.task.trim()
  }
  if (request.body.isDone !== undefined) {
    product.isDone = request.body.isDone
  }
  response.redirect('/todos')
})

// listens for bad requests
app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)

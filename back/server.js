const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const axios = require('axios')
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

const getSessionId = require('./router/getSession')

app.use(cors())

io.on('connection', socket => {
  console.log('Socket connected with ID:', socket.id)
  var roId;
  socket.on('roNo', id => {
    roId = id;
    console.log(roId)
    getSessionId(socket, roId)
  })
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})

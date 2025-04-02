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
  // console.log('Socket connected with ID:', socket.id)
  var roId;
  socket.on('roNo', async id => {
    roId = id;
    getSessionId(socket, roId)
  })

  socket.on('operate',async (dir, id, sessionID) => {
    const direction = ['forward', 'backward', 'left', 'right']
    const op = await axios.post(`https://fleetbots-production.up.railway.app/api/rover/Rover-${id}/move?session_id=${sessionID}&direction=${direction[dir-1]}`)
    socket.emit('direction', op.data.message)
  })
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})

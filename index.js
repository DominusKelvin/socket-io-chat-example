const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html')
})

io.on('connect', (socket) => {
  console.log('realtime user connected')
 socket.on('chat message', (message) => {
	 io.emit('chat message', message)
 })

socket.on('disconnect', () => {
	io.emit('user disconnected', 'A user just disconnected')
  })

})



http.listen(3000, () => {
  console.log("listening on *:3000")
})

import path from 'path'
import socketDefinition from './chat-sockets'

var request = require('request')
var url = require('url')
export default () => {
}

var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs')

io.set('origins', '*:*')

app.listen(process.env.PORT || 3000)

function handler (req, res) {
  const reqUrl = url.parse(req.url, true)
  if (req.url.lastIndexOf('/proxy?', 0) === 0) {
    var x = request(req.url.substring('7'))
    req.pipe(x)
    x.pipe(res)
    return
  }

  let filePath = decodeURIComponent(reqUrl.pathname)

  const readFile = (err, data) => {
    if (err) {
      res.writeHead(500)
      console.error(err)
      return res.end(`Error loading ${reqUrl.pathname}`)
    }

    res.writeHead(200)
    return res.end(data)
  }

  if (filePath === '/') {
    filePath += 'index.html'
  }

  if (filePath === '/socket.io/socket.io.js') {
    filePath = '../node_modules/socket.io-client/dist/socket.io.js'
  }

  filePath = path.join(__dirname, filePath.substring(1, filePath.length))

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(err)
      fs.readFile(path.join(__dirname, '/index.html'), readFile)
      return
    }

    if (stats.isFile) {
      fs.readFile(filePath, readFile)
    }
  })
}

socketDefinition(io)

console.log('Server started')

import uuid from 'uuid/v4'
import path from 'path'
import socketDefinition from './chat-sockets'
import db from './db'

var request = require('request')
var url = require('url')
export default () => {
}

var app = require('http').createServer(handler)
var io = require('socket.io')(app, {origins: '*:*'})
var fs = require('fs')
io.set('origins', '*:*')
io.origins('*:*')
app.listen(process.env.PORT || 3000)

const serverUser = {
  id: 99999,
  name: 'Server / UNKNOWN'
}

const wrapMessage = (msg, user, channel) => {
  let wrap = {
    user: user || serverUser,
    message: msg || '',
    id: uuid(),
    channel: channel || 'nathejk'
  }
  wrap = JSON.parse(JSON.stringify(wrap).toString('utf8'))
  wrap.createdAt = new Date()
  return wrap
}

function handler (req, res) {
  try {
    const reqUrl = url.parse(req.url, true)
  // console.log(req)
    if (req.method === 'POST') {
  // console.log(req)
      if (req.url.lastIndexOf('/chat/post', 0) === 0) {
        let body = []
        req.on('error', (err) => {
          console.error(err)
        }).on('data', (chunk) => {
          if (body.length > 1e6) {
        // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy()
          }
          console.log(chunk)

          body.push(chunk)
        }).on('end', () => {
        // console.log(body)
          body = Buffer.concat(body).toString('utf8')
          console.log(body)
          const { channel, message, user } = JSON.parse(body).message
          const wrappedMessage = wrapMessage(message, user, channel)
          // console.log(wrappedMessage)
          db.saveMessage(wrappedMessage)
          res.writeHead(201)
          return res.end(JSON.stringify(wrappedMessage))
        })
      }
    }
    if (req.method === 'GET') {
  // const reqUrl = url.parse(req.url, true)
      if (req.url.lastIndexOf('/chat/from?from=', 0) === 0) {
        // console.log(req.url)
        var fromDate = req.url.substring('16')
        // console.log(fromDate)
        db.getMessagesSince('', fromDate, (err, data) => {
          if (err) {
            console.error(err)
            return
          }
          if (!data || data.length === 0) {
            console.log([`no data?`, data, fromDate])
            return
          }

          // data = JSON.parse(JSON.stringify(data))
          res.writeHead(200)
          return res.end(JSON.stringify(data))
        })
        return
      }

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
          fs.readFile(path.join(__dirname, '/index.html'), readFile)
          return
        }

        if (stats.isFile) {
          fs.readFile(filePath, readFile)
        }
      })
    }
  } catch (error) {
    res.writeHead(500)
    console.error(error)
    return res.end(JSON.stringify(error))
  }
}

socketDefinition(io)

console.log('Server started')

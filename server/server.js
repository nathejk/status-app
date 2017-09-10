const path = require('path')
var app = require('http').createServer(handler)
var fs = require('fs')
var url = require('url')
var request = require('request')

app.listen(process.env.PORT || 3000)
function handler (req, res) {
  const reqUrl = url.parse(req.url, true)
  if (req.url.lastIndexOf('/proxy?', 0) === 0) {
    var x = request(req.url.substring('7'))
    console.log(req.url.substring('7'))
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
    res.end(data)
  }

  if (filePath === '/') {
    filePath += 'index.html'
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

console.log('Server started')

// fake realtime

var req = require('hyperquest'),
  url = require('url'),
  path = require('path'),
  channels = {},
  currentChannelId = 0

function readResponse(response, callback) {
  var body = ''
  response.on('data', function (d) {
    body += d.toString()
  })
  response.on('end', function () {
    callback(JSON.parse(body))
  })
  response.on('error', callback)
}

function createSSEChannel(numPages) {
  var id = currentChannelId++
  channels[id] = {
    page: 1,
    numPages: numPages,
    finished: false
  }
  return '/fake-realtime?id=' + id
}

function getMetadata(assetsURL, callback) {
  var metadataURL = url.resolve(assetsURL + '/', 'info.json')

  var r = req(metadataURL, function (err, res) {
    if (res.statusCode === 200) {
      readResponse(res, function (metadata) {
        callback(null, metadata)
      })
    } else {
      callback('error loading info.json')
    }
  })

  r.on('error', function (err) {
    callback('error loading info.json (' + JSON.stringify(err) + ')')
  })
}

function handleCreateRequest(parsedURL, response) {
  getMetadata(parsedURL.query.url, function (err, metadata) {
    if (err) {
      response.writeHead(500)
      response.end(err)
      return
    }
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    })
    response.end(createSSEChannel(metadata.numpages))
  })
}

function handleSSERequest(parsedURL, request, response) {
  var channelId = parsedURL.query.id,
    channel = channels[channelId],
    lastEventId,
    timeoutId,
    i, c

  if (!channel) {
    response.writeHead(404, {
      'Access-Control-Allow-Origin': '*'
    })
    response.end('channel not found')
    return
  }

  response.socket.setTimeout(0)
  response.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  })

  response.write(':' + (new Array(2049)).join(' ') + '\n'); // 2kB padding for IE
  response.write('retry: 2000\n')

  lastEventId = Number(request.headers['last-event-id']) || Number(parsedURL.query.lastEventId) || 0

  timeoutId = 0
  i = lastEventId
  c = i + 100; // send 100 events before forcing a reconnect

  function sendEvent() {
    var data = {},
      eventName
    if (++i < c) {
      if (channel.page < channel.numPages) {
        data.pages = [channel.page++]
        eventName = 'pageavailable.svg'
      } else {
        eventName = 'finished.svg'
        data = ''
      }
      response.write('id: ' + i + '\n')
      response.write('event: ' + eventName + '\n')
      response.write('data: ' + (data ? JSON.stringify(data) : '') + '\n\n')
      timeoutId = setTimeout(sendEvent, Math.floor((Math.random() * 1000 + 50)))
    } else {
      response.end()
    }
  }

  sendEvent()

  response.on('close', function () {
    clearTimeout(timeoutId)
  })
}

module.exports = function (request, response, next) {
  var parsedURL = url.parse(request.url, true)
  if (parsedURL.pathname === '/create-fake-realtime') {
    handleCreateRequest(parsedURL, response)
  } else if (parsedURL.pathname === '/fake-realtime') {
    handleSSERequest(parsedURL, request, response)
  } else {
    next()
  }
}

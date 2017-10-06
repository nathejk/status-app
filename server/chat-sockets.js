import uuid from 'uuid/v4'
import casual from 'casual'

import db from './db'

export const MSG_API__CHANGE_CHANNEL = 'MSG_API__CHANGE_CHANNEL'
export const MSG_API__JOIN_CHANNEL = 'join channel'
export const MSG_API__LEAVE_CHANNEL = 'leave channel'
export const MSG_API__NEW_MESSAGE = 'new message'
export const MSG_API__NEW_MESSAGE_BULK = 'MSG_API__NEW_MESSAGE_BULK'
export const MSG_API__GET_MESSAGES_FROM = 'MSG_API__GET_MESSAGES_FROM'

const serverUser = {
  id: 99999,
  name: 'Server / UNKNOWN'
}

const wrapMessage = (msg, user, channel) => {
  let wrap = {
    user: user || serverUser,
    message: msg || casual.words(Math.random() * 100),
    id: uuid(),
    channel: channel || 'nathejk'
  }
  wrap = JSON.parse(JSON.stringify(wrap).toString('utf8'))
  wrap.createdAt = new Date()
  return wrap
}

exports = module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.join('Nathejk')
    const query = socket.handshake.query

    console.log(`${query.phone} connected`)

    socket.on('new message', ({channel, message, user}) => {
      let wrappedMessage = wrapMessage(message, user, channel)

      db.saveMessage(wrappedMessage)
      io.in('Nathejk').emit(MSG_API__NEW_MESSAGE, wrappedMessage)
    })

    socket.on(MSG_API__GET_MESSAGES_FROM, ({channel, fromDate}) => {
      db.getMessagesSince(channel, fromDate, (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        if (!data || data.length === 0) {
          console.log([`no data?`, data, fromDate])
          return
        }
        try {
          data = JSON.parse(JSON.stringify(data))
          socket.emit(MSG_API__NEW_MESSAGE_BULK, data)
        } catch (error) {
          console.error(error)
          throw error
        }
      })
    })

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`)
    })

    socket.on('error', (error) => {
      console.error(error)
    })
  })
}

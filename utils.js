const { admin } = require('./config');

const isAdmin = (message) => {
  return admin === message.chat.username
}

module.exports = {
  isAdmin
}

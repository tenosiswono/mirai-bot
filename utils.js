const { admin } = require('./config');

const isAdmin = (message) => {
  return admin === message.from.username
}

module.exports = {
  isAdmin
}

const { chatStates } = require('../../config');
const { isAdmin } = require('../../utils')
const { setChannel } = require('../../plugins/firebase');

const setChannelHandlers = ({ reply, session, message }) => {
  if (isAdmin(message)) {
    session.chatState = chatStates.AWAITING_COMMAND;
    const opts = message.text.replace('/set_channel ', '').split(' ')
    setChannel(opts[0], opts[1]).then(_ => {
      reply('Squad channel berhasil dirubah')
    })
  }
};

module.exports = setChannelHandlers;

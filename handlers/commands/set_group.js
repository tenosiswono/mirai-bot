const { chatStates } = require('../../config');
const { isAdmin } = require('../../utils')
const { setGroupSquad } = require('../../plugins/firebase');

const setGroupHandler = ({ reply, session, message }) => {
  if (isAdmin(message)) {
    session.chatState = chatStates.AWAITING_COMMAND;
    const squad_name = message.text.replace('/set_group ', '')
    setGroupSquad(squad_name, message).then(_ => {
      reply('Squad group berhasil ditambah')
    })
  }
};

module.exports = setGroupHandler;

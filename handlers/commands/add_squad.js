const { chatStates } = require('../../config');
const { isAdmin } = require('../../utils')
const { addSquad } = require('../../plugins/firebase');

const addSquadHandlers = ({ reply, session, message }) => {
  if (isAdmin(message)) {
    session.chatState = chatStates.AWAITING_COMMAND;
    const squad_name = message.text.replace('/add_squad ', '')
    addSquad(squad_name).then(_ => {
      reply('Squad berhasil ditambah')
    })
  }
};

module.exports = addSquadHandlers;

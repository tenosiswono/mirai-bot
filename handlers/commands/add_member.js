const { Markup } = require('telegraf');
const { chatStates } = require('../../config');
const { isAdmin } = require('../../utils')
const { getSquads } = require('../../plugins/firebase');

const addMemberHandlers = ({ reply, session, message }) => {
  if (isAdmin(message)) {
    session.chatState = chatStates.AWAITING_SQUAD_PICK;
    getSquads().then(value => {
      const squadButton = []
      for(key in value.val()) {
        const nextAction = `pick_squad:${key}`;
        squadButton.push(Markup.button(key, false))
      }
      const keyboard = Markup.keyboard([squadButton])
      reply('Pilih squad', keyboard.extra());
    })
  }
};

module.exports = addMemberHandlers;

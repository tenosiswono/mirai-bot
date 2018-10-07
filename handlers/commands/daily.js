const { Markup } = require('telegraf');
const { chatStates, admin } = require('../../config');
const { getSquads } = require('../../plugins/firebase');

const dailyUpdateHandler = ({ reply, replyWithMarkdown, session, message }) => {
  session.chatState = chatStates.AWAITING_DAILY_SQUAD_PICK;
  getSquads().then(value => {
    const squadButton = []
    const squadData = value.val()
    for(key in squadData) {
      if (squadData[key].members && squadData[key].members.indexOf(message.chat.username) > -1) {
        const nextAction = `pick_squad:${key}`;
        squadButton.push(Markup.button(key, false))
      }
    }
    if (squadButton.length) {
      const keyboard = Markup.keyboard([squadButton])
      reply('Pilih squad', keyboard.extra());
    } else {
      session.chatState = chatStates.AWAITING_COMMAND;
      reply(`Kamu nggak kedaftar di squad manapun, coba hub @${admin}`);
    }
  })
};

module.exports = dailyUpdateHandler;

const { Markup } = require('telegraf');
const { chatStates, admin, botName } = require('../../config');
const { getSquads } = require('../../plugins/firebase');

const dailyUpdateHandler = ({ reply, replyWithMarkdown, session, message }) => {
  if (message.chat.type === "private") {
    session.chatState = chatStates.AWAITING_DAILY_SQUAD_PICK;
    getSquads().then(squadData => {
      const squadButton = []
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
  } else {
    session.chatState = chatStates.AWAITING_COMMAND;
    reply(`Silahkan update secara private ${botName}`);
  }
};

module.exports = dailyUpdateHandler;

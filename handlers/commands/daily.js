const { Markup } = require('telegraf');
const { chatStates, admin, botName } = require('../../config');
const { getSquads } = require('../../plugins/firebase');
const { daily_update_template } = require('../../config/messages')
const moment = require('moment');
moment.locale('id');

const dailyUpdateHandler = async ({ reply, replyWithMarkdown, session, message }) => {
  if (message.chat.type === "private") {
    const squadName = message.text.split(' ')[1]
    if (squadName) {
      const squad = await getSquads(squadName)
      if (squad) {
        session.chatState = chatStates.AWAITING_DAILY_TEXT;
        session.squadPick = squadName
        const today = moment().format('dddd, DD MMM YYYY')
        const template = daily_update_template.replace('{day}', today).replace('{tag}', moment().format('DDMMYY'))
        await replyWithMarkdown(`Tulis daily update untuk hari: *${today}*\nFormat:`, Markup.removeKeyboard().extra())
        await replyWithMarkdown(template)
      } else {
        reply('Squad tidak dikenali');
      }
    } else {
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
    }
  } else {
    session.chatState = chatStates.AWAITING_COMMAND;
    reply(`Silahkan update secara private ${botName}`);
  }
};

module.exports = dailyUpdateHandler;

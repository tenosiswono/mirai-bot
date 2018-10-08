const { Markup } = require('telegraf');
const { chatStates, channelId } = require('../../config');
const { daily_update_template } = require('../../config/messages')
const { saveDaily, addMember } = require('../../plugins/firebase');
const { isAdmin } = require('../../utils')
var moment = require('moment');
moment.locale('id');

const textHandler = (ctx) => {
  const {
    reply,
    replyWithMarkdown,
    session,
    forwardMessage,
    message
  } = ctx;

  if (isAdmin) {
    if (session.chatState === chatStates.AWAITING_SQUAD_PICK) {
      session.chatState = chatStates.AWAITING_MEMBER_ENTRY;
      session.squadPick = message.text
      reply('Masukan username telegram member:', Markup.removeKeyboard().extra());
    } else if (session.chatState === chatStates.AWAITING_MEMBER_ENTRY) {
      addMember(session.squadPick, message.text).then(_ => {
        session.chatState = chatStates.AWAITING_COMMAND;
        session.squadPick = undefined
        reply('Data member Telah dimasukan');
      })
    }
  }
  if (session.chatState === chatStates.AWAITING_DAILY_TEXT) {
    session.chatState = chatStates.AWAITING_COMMAND;
    forwardMessage(channelId)
    saveDaily(session.squadPick, message)
    session.squadPick = undefined
    reply('Daily berhasil di post');
  } else if (session.chatState === chatStates.AWAITING_DAILY_SQUAD_PICK) {
    session.chatState = chatStates.AWAITING_DAILY_TEXT;
    session.squadPick = message.text
    const today = moment().format('dddd, DD MMM YYYY')
    const template = daily_update_template.replace('{day}', today).replace('{tag}', moment().format('DDMMYY'))
    replyWithMarkdown(`Tulis daily update untuk hari: *${today}*\nFormat:`, Markup.removeKeyboard().extra());
    replyWithMarkdown(template)
  }
}

module.exports = textHandler;

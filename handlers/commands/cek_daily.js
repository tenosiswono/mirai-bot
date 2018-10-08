const { Markup } = require('telegraf');
const { chatStates } = require('../../config');
const { getMembers, getDailyMembersToday, getGroupSquad } = require('../../plugins/firebase');
var moment = require('moment');
moment.locale('id');


const cekDailyHandler = async ({ reply, replyWithMarkdown, session, message }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  const squadName = getGroupSquad(message)
  if (squadName) {
    const firebaseMembers = await getMembers(squadName)
    const firebaseDailyMembers = await getDailyMembersToday(squadName)
    const members = firebaseMembers.val() || []
    const dailyMembers = Object.keys(firebaseDailyMembers.val() || {})
    const notDailyMembers = members.filter( mem => {
      return dailyMembers.indexOf(mem) < 0;
    });
    const today = moment().format('dddd, MMMM Do YYYY')
    if (notDailyMembers.length) {
      replyWithMarkdown(`*Daily ${today}*, yang belum update nih\n${notDailyMembers.map(mem => `@${mem}`).join('\n').replace('_', '\\_')}`)
    } else {
      replyWithMarkdown(`*Daily ${today}*, semua sudah update`)
    }
  } else {
    reply('Group tidak terdaftar')
  }
 };

module.exports = cekDailyHandler;

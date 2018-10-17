const { chatStates } = require('../../config');
const { getSquads, getDailyMembersToday, getGroupSquad } = require('../../plugins/firebase');
const moment = require('moment');
moment.locale('id');

const cekDailyHandler = async ({ reply, replyWithMarkdown, session, message }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  const squadName = await getGroupSquad(message)
  if (squadName) {
    const squad = await getSquads(squadName)
    const firebaseDailyMembers = await getDailyMembersToday(squadName)
    const members = squad.members || []
    const excludeMembers = squad.exclude_members || []
    const dailyMembers = Object.keys(firebaseDailyMembers)
    const notDailyMembers = members.filter( mem => {
      return dailyMembers.indexOf(mem) < 0 && excludeMembers.indexOf(mem) < 0;
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

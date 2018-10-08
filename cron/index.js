const CronJob = require('cron').CronJob;
const { getSquads, getDailyMembersToday } = require('../plugins/firebase');
var moment = require('moment');
moment.locale('id');

const cron = (bot) => {
  new CronJob('00 30 13 * * 1-5', async () => {
    const squads = await getSquads()
    for(const squad in squads) {
      const firebaseDailyMembers = await getDailyMembersToday(squad)
      const dailyMembers = Object.keys(firebaseDailyMembers.val() || {})
      const members = squads[squad].members || []
      const excludeMembers = squads[squad].exclude_members || []
      const notDailyMembers = members.filter( mem => {
        return dailyMembers.indexOf(mem) < 0 || excludeMembers.indexOf(mem) < 0;
      });
      const today = moment().format('dddd, MMMM Do YYYY')
      if (notDailyMembers.length) {
        bot.telegram.sendMessage(squads[squad].group
          ,`*Daily ${today}*, yang belum update nih\n${notDailyMembers.map(mem => `@${mem}`).join('\n').replace('_', '\\_')}`
          , { parse_mode: 'Markdown'})
      } else {
        bot.telegram.sendMessage(squads[squad].group
          ,`*Daily ${today}*, semua sudah update`
          , { parse_mode: 'Markdown'})
      }
    }
  }, null, true, 'Asia/Jakarta')
}

module.exports = cron

require('dotenv').config()

const Telegraf = require('telegraf')
const cron = require('./cron')
const LocalSession = require('telegraf-session-local');
const handlers = require('./handlers')
const { start } = require('./config/messages')
const { botName } = require('./config')

const bot = new Telegraf(process.env.BOT_TOKEN, {username: botName})

const localSession = new LocalSession({ database: 'db.json' });
bot.use(localSession.middleware());

bot.start((ctx) => ctx.reply(start))

// Handle Message
bot.use(handlers.commands, handlers.messages);

bot.catch((err) => {
  console.log('Ooops', err)
})

bot.startPolling();
cron(bot)

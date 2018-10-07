const { Composer } = require('telegraf');

const composer = new Composer();

const dailyHandler = require('./daily');
const helpHandler = require('./help');
const addSquadHandler = require('./add_squad');
const addMemberHandlers = require('./add_member')
const cekDailyHandler = require('./cek_daily')

composer.command('daily', dailyHandler);
composer.command('help', helpHandler);
composer.command('add_squad', addSquadHandler);
composer.command('add_member', addMemberHandlers);
composer.command('cek_daily', cekDailyHandler);

module.exports = composer;


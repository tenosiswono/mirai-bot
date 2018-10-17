const { Composer } = require('telegraf');

const composer = new Composer();

const dailyHandler = require('./daily');
const helpHandler = require('./help');
const addSquadHandler = require('./add_squad');
const addMemberHandler = require('./add_member')
const cekDailyHandler = require('./cek_daily')
const setGroupHandler = require('./set_group')
const setChannelHandler = require('./set_channel')
const setCancelHandler = require('./cancel')

composer.command('daily', dailyHandler);
composer.command('help', helpHandler);
composer.command('add_squad', addSquadHandler);
composer.command('add_member', addMemberHandler);
composer.command('cek_daily', cekDailyHandler);
composer.command('set_group', setGroupHandler);
composer.command('set_channel', setChannelHandler);
composer.command('cancel', setCancelHandler);

module.exports = composer;


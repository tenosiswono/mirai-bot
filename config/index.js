module.exports = {
  chatStates: {
    AWAITING_COMMAND: 'AWAITING_COMMAND',
    AWAITING_DAILY_SQUAD_PICK: 'AWAITING_DAILY_SQUAD_PICK',
    AWAITING_DAILY_TEXT: 'AWAITING_DAILY_TEXT',
    AWAITING_SQUAD_ENRTY: 'AWAITING_SQUAD_ENRTY',
    AWAITING_SQUAD_PICK: 'AWAITING_SQUAD_PICK',
    AWAITING_MEMBER_ENTRY: 'AWAITING_MEMBER_ENTRY'
  },
  admin: process.env.BOT_ADMIN,
  botName: process.env.BOT_NAME
};

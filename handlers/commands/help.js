const { chatStates } = require('../../config');
const { help } = require('../../config/messages')

const helpHandler = ({ replyWithMarkdown, session }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  replyWithMarkdown(help)
};

module.exports = helpHandler;

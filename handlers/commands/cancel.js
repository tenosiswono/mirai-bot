const { chatStates } = require('../../config');
const { abort } = require('../../config/messages')

const cancelHandler = ({ reply, session }) => {
  session.chatState = chatStates.AWAITING_COMMAND;
  reply(abort)
};

module.exports = cancelHandler;

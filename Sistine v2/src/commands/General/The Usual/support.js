const { Command } = require('klasa');

module.exports = class Support extends Command {

	constructor(...args) {
		super(...args, { description: (lang) => lang.get('COMMAND_SUPPORT_DESCRIPTION') });
	}

	async run(msg) {
		return msg.send(msg.language.get('COMMAND_SUPPORT'));
	}

};

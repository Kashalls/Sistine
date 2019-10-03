const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Rate someone',
			usage: '[User:username]'
		});
	}

	async run(msg, [user = msg.author]) {
		const image = await this.client.idioticApi.waifuInsult(user.displayAvatarURL({ format: 'png', size: 256 }));
		return msg.channel.sendFile(image, 'waifu-insult.png');
	}

};

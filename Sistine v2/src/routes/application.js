const { Route } = require('klasa-dashboard-hooks');
const { Duration } = require('klasa');

module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: 'application' });
	}

	async get(request, response) {
		let [users, guilds, channels, memory, vc, cpm] = [0, 0, 0, 0, 0, 0];

		const results = await this.client.shard.broadcastEval(`[this.guilds.reduce((prev, val) => val.memberCount + prev, 0), this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`); // eslint-disable-line max-len
		for (const result of results) {
			users += result[0];
			guilds += result[1];
			channels += result[2];
			memory += result[3];
		}

		return response.end(JSON.stringify({
			users: users,
			guilds: guilds,
			channels: channels,
			shards: this.client.options.shardCount,
			uptime: Duration.toNow(Date.now() - (process.uptime() * 1000)),
			latency: this.client.ws.ping.toFixed(0),
			memory: memory,
			invite: this.client.invite,
			...this.client.application
		}));
	}

};

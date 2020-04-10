import Module from './module/Module';
import { Message, User } from 'discord.js';
import EventHandler from './eventHandler/EventHandlerDecorator';
import CommandExecution from './command/CommandExecution';
import Command from './command/Command';

export default class CoreModule extends Module {
	@EventHandler('ready')
	ready() {
		console.log(`Logged in as ${this.client.user?.tag}!!!`);
	}

	@EventHandler('message', { description: 'The command dispatcher' })
	onMessage(msg: Message) {
		if (
			msg.author.bot ||
			!msg.content.toLowerCase().startsWith(this.client.config.prefix!)
		)
			return;

		let withoutPrefix = msg.content.substring(
			this.client.config.prefix?.length!
		);
		let _cmd = withoutPrefix.split(' ');
		let label = _cmd[0];
		_cmd.shift();
		let args: string[] = _cmd;

		const execution: CommandExecution = {
			issuer: msg.author,
			memberIssuer: msg.member || null,
			channelType: msg.channel.type,
			channel: msg.channel,
			content: msg.content,
			label: label,
			args,
			prefix: this.client.config.prefix!,

			message: msg,
		};
		this.client.commandManager.dispatchCommand(execution);
		// console.log('dispatched', execution);
	}

	// REGEX
	USER_MENTION_OR_ID_REGEX = /(<@)?!?\d{17,20}>?/;
	USER_MENTION_REGEX = /^<@!?(\d+)>$/;

	parseCommandArguments(cmd: Command, args: string[], params: Function[]) {
		let i: number = 0;
		const callArgs: any[] = [];
		const refArgs = args.slice(0); //create a copy
		params.forEach((p: Function) => {
			console.log(i);
			let element: string;
			console.log(args);
			if (i === params.length - 1) {
				console.log('last arg ', args.join(' '));
				callArgs.push(args.join(' '));
			}
			switch (p) {
				case User:
					element = refArgs[i].replace(/[\\<>@#&!]/g, '');
					if (this.USER_MENTION_OR_ID_REGEX.test(refArgs[i])) {
						const userMatch =
							this.USER_MENTION_OR_ID_REGEX.exec(element) ||
							this.USER_MENTION_REGEX.exec(element) ||
							[];
						const id = userMatch[1] ? userMatch[1] : userMatch[0];
						const userArg = this.client.users.cache.get(id);
						callArgs.push(userArg);
					} else throw new TypeError(`Missing desired argument: ${p.name}`);
					break;

				case Number:
					element = refArgs[i];
					if (isNaN(parseInt(element)))
						throw new TypeError(`Missing desired argument: ${p.name}`);
					callArgs.push(parseInt(element));
					break;

				case String:
					element = refArgs[i];
					if (!element)
						throw new TypeError(`Missing desired argument: ${p.name}`);
					callArgs.push(element.toString());
					break;
			}
			i++;
			args.shift();
		});
		return callArgs;
	}
}

import { Message, User } from 'discord.js';

import { Module } from './Module';
import { EventHandler } from '../eventHandler/decorator/EventHandlerDecorator';
import { CommandExecution } from '../command/execution/CommandExecution';
import { Command } from '../command/decorator/CommandDecorator';

import { CommandExecutionProps } from '../command/execution/CommandExecutionProps';
import { Command as CommandClass } from '../command/Command';
import CharmClient from '..';

export class CoreModule extends Module {
	constructor(client: CharmClient) {
		super(client, 'charm:CoreModule');
	}

	@EventHandler('ready')
	ready() {
		console.log(`Logged in as ${this.client.user?.tag}!!!`);
	}

	@Command()
	test(e: CommandExecution): boolean {
		e.reply('test!');
		return true;
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

		const execution: CommandExecutionProps = {
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
		this.client.commandManager.dispatchCommand(new CommandExecution(execution));
	}

	// REGEX
	USER_MENTION_OR_ID_REGEX = /(<@)?!?\d{17,20}>?/;
	USER_MENTION_REGEX = /^<@!?(\d+)>$/;

	parseCommandArguments(cmd: CommandClass, args: string[]) {
		const callArgs: any[] = [];
		const refArgs = args.slice(0); //create a copy
		const minimumArgLength = cmd.params.filter(c => !c.optional).length - 1;
		const params = cmd.params.slice(0);
		if (args.length < minimumArgLength)
			throw TypeError(
				`Expected ${minimumArgLength} arguments but only found ${args.length}`
			);
		params.shift();
		for (const i in refArgs) {
			let arg = refArgs[i];
			const p = params[i];

			// add single arg mode support

			if (p === params[params.length - 1] && cmd.restLastParameter) {
				callArgs.push(args.join(' '));
				return callArgs;
			}

			if (!p) return callArgs;

			try {
				switch (p.fn) {
					case User:
						arg = refArgs[i];
						if (!arg)
							throw new TypeError(`Missing desired argument: ${p.fn.name}`);
						const noMention = arg.replace(/[\\<>@#&!]/g, '');

						if (this.USER_MENTION_OR_ID_REGEX.test(refArgs[i])) {
							const userMatch =
								this.USER_MENTION_OR_ID_REGEX.exec(noMention) ||
								this.USER_MENTION_REGEX.exec(noMention) ||
								[];
							const id = userMatch[1] ? userMatch[1] : userMatch[0];
							const userArg = this.client.users.cache.get(id);
							callArgs.push(userArg);
						} else
							throw new TypeError(`Missing desired argument: ${p.fn.name}`);

						break;

					case Number:
						arg = refArgs[i];
						if (isNaN(parseInt(arg)))
							throw new TypeError(`Missing desired argument: ${p.fn.name}`);
						callArgs.push(parseInt(arg));
						break;

					case String:
						arg = refArgs[i];
						if (!arg)
							throw new TypeError(`Missing desired argument: ${p.fn.name}`);
						callArgs.push(arg.toString());
						break;
				}
			} catch (err) {
				const error: Error = err;
				if (error.message.includes('Missing desired argument') && p.optional)
					return callArgs;
				else throw err;
			}
			args.shift();
		}
		return callArgs;
	}
}

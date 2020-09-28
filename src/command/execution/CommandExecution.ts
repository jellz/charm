
import { MessageEmbed } from 'discord.js';
import { User } from 'discord.js';
import { Channel } from 'discord.js';
import { Message } from 'discord.js';
import CommandExecutionProps from './CommandExecutionProps';

export default class CommandExecution {
	issuer: User;
	channel: Channel;
	message: Message;
	args: string[];
	prefix: string;
	label: string;
	content: string;

	// channelType: string;
	// memberIssuer: GuildMember | null;

	constructor(props: CommandExecutionProps) {
		this.issuer = props.issuer;
		this.channel = props.channel;
		this.message = props.message;
		this.args = props.args;
		this.prefix = props.prefix;
		this.label = props.label;
		this.content = props.content;
	}

	reply(content: string | MessageEmbed, mention?: boolean) {
		if (content instanceof MessageEmbed)
			this.message.channel.send(`${mention ? this.issuer.toString() : ''}`, {
				embed: content,
			});
		else if (typeof content === 'string')
			this.message.channel.send(
				`${mention ? this.issuer.toString() : ''} ${content}`
			);
	}
}

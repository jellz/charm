import type { GuildMember } from 'discord.js';
import type { User } from 'discord.js';
import type { Channel } from 'discord.js';
import type { Message } from 'discord.js';

export default interface CommandExecution {
	issuer: User;
	memberIssuer: GuildMember | null;
	channelType: string;
	channel: Channel;
	content: string;
	label: string;
	args: string[];
	prefix: string;
	message: Message;
}

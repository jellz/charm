import { GuildMember } from 'discord.js';
import { User } from 'discord.js';
import { Channel } from 'discord.js';
import { Message } from 'discord.js';

export interface CommandExecutionProps {
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

import { Channel } from 'discord.js';
import { DMChannel } from 'discord.js';
import { TextChannel } from 'discord.js';
import { VoiceChannel } from 'discord.js';
import { CategoryChannel } from 'discord.js';
import { NewsChannel } from 'discord.js';
import { StoreChannel } from 'discord.js';

export function castChannelToType(channel: Channel) {
	switch (channel.type) {
		case 'dm':
			return channel as DMChannel;
		case 'text':
			return channel as TextChannel;
		case 'voice':
			return channel as VoiceChannel;
		case 'category':
			return channel as CategoryChannel;
		case 'news':
			return channel as NewsChannel;
		case 'store':
			return channel as StoreChannel;
		case 'unknown':
		default:
			return channel;
	}
}

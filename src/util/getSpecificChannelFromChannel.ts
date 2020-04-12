import type { Channel } from 'discord.js';
import type { DMChannel } from 'discord.js';
import type { TextChannel } from 'discord.js';
import type { VoiceChannel } from 'discord.js';
import type { CategoryChannel } from 'discord.js';
import type { NewsChannel } from 'discord.js';
import type { StoreChannel } from 'discord.js';

export default function getSpecificChannelFromChannel(channel: Channel) {
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

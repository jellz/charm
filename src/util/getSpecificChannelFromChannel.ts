import {
	Channel,
	DMChannel,
	TextChannel,
	VoiceChannel,
	CategoryChannel,
	NewsChannel,
	StoreChannel,
} from 'discord.js';

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

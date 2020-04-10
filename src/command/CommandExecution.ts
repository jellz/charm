import { GuildMember, Message, User, Channel } from 'discord.js';

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

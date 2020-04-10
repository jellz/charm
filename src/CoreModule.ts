import Module from './Module';
import { Message } from 'discord.js';
import EventHandler from './eventHandler/EventHandlerDecorator';
import CommandExecution from './command/CommandExecution';

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

    let withoutPrefix = msg.content.substring(this.client.config.prefix?.length!);
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

      message: msg
    }
    this.client.commandManager.dispatchCommand(label, execution);
    console.log('dispatched', execution);
	}
}

import CharmClient from '../CharmClient';
import Command from './Command';
import { Collection, Message } from 'discord.js';
import CommandExecution from './CommandExecution';

export default class CommandManager {
	private commandStore: Collection<string, Command>;
	private client: CharmClient;

	constructor(client: CharmClient) {
		this.commandStore = new Collection();
		this.client = client;
	}

	registerCommand(command: Command) {
		if (this.commandStore.get(command.id))
			throw `A command with this name already exists (${command.id})`;
		this.commandStore.set(command.id, command);
	}

	// This function is called after something determined a command was sent. The purpose of this function is to find the appropriate function to handle the command.
	dispatchCommand(label: string, execution: CommandExecution) {
    const cmd = this.getCommandByLabel(label);
    if (!cmd) return;
    cmd.function(execution);
  }

	getCommandByLabel(label: string) {
		return this.commandStore.find(
			c => c.id == label || c.aliases.includes(label)
		);
	}
}

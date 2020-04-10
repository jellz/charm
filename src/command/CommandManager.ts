import CharmClient from '../CharmClient';
import Command from './Command';
import { Collection, Message } from 'discord.js';
import CommandExecution from './CommandExecution';
import CoreModule from '../CoreModule';

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

	// This function is called after something determined a command was sent. The purpose of this function is to find the appropriate function to handle the command and call it.
	dispatchCommand(execution: CommandExecution) {
		const cmd = this.getCommandByLabel(execution.label);
		if (!cmd)
			return console.error(
				`Tried to dispatch a non-existent command? ${execution.message.id}`
			);
		try {
			const coreMod = this.client.moduleManager.getModule('CoreModule') as CoreModule;
			const callArgs: any[] = coreMod.parseCommandArguments(
				cmd,
				execution.args
			);
			cmd.function(execution, ...callArgs);
		} catch (err) {
			console.error(err);
			const error: Error = err;
			return execution.message.channel.send(`There was an error while executing this command: ${error.message}`);
		}
	}

	getCommandByLabel(label: string) {
		return this.commandStore.find(
			c => c.id == label || c.aliases.includes(label)
		);
	}
}

import { Collection } from 'discord.js';

import type CharmClient from '../..';
import type Command from '../Command';
import type CommandExecution from '../CommandExecution';
import type CoreModule from '../../module/CoreModule';

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
		const cmds = this.getCommandsByLabel(execution.label).array();
		if (cmds.length === 0)
			return console.error(
				`Tried to dispatch a non-existent command? ${execution.message.id}`
			);
		for (const cmd of cmds) {
			console.log('cmd', cmd.id);
			try {
				const coreMod = this.client.moduleManager.getModule(
					'charm:CoreModule'
				) as CoreModule;
				const callArgs: any[] = coreMod.parseCommandArguments(
					cmd,
					execution.args
				);
				if (cmd.function(execution, ...callArgs) === true) break;
			} catch (err) {
				console.error(err);
				const error: Error = err;
				return execution.message.channel.send(
					`There was an error while executing this command: ${error.message}`
				);
			}
		}
	}

	getCommandsByLabel(label: string) {
		return this.commandStore.filter(
			c => c.name == label || c.aliases.includes(label)
		);
	}
}

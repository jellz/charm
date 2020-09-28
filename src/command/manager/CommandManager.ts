import { Collection } from 'discord.js';

import { CharmClient } from '../..';
import { Command } from '../Command';
import { CommandExecution } from '../execution/CommandExecution';
import { CoreModule } from '../../module/CoreModule';

export class CommandManager {
	private commandStore: Collection<string, Command>;

	private client: CharmClient;

	constructor(client: CharmClient) {
		this.commandStore = new Collection();

		this.client = client;
	}

	registerCommand(command: Command) {
		const overridingCommand = this.commandStore.find(
			c =>
				command.id === c.id ||
				command.name === c.name ||
				command.aliases.some(r => c.aliases.indexOf(r) >= 0)
		);
		if (overridingCommand) {
			command.overriding = true;
			if (!command.aliases.includes(command.name))
				command.aliases.push(command.name);
			command.name = overridingCommand.name;
		}
		this.commandStore.set(command.id, command);
		this.commandStore = this.commandStore.sort((a, b) =>
			a === b ? 0 : a ? -1 : 1
		); //sort by overriding = true first
	}

	// This function is called after something determined a command was sent. The purpose of this function is to find the appropriate function to handle the command and call it.
	dispatchCommand(execution: CommandExecution) {
		const cmds = this.getCommandsByLabel(execution.label).array();
		if (cmds.length === 0)
			return console.error(
				`Tried to dispatch a non-existent command? ${execution.message.id}`
			);
		for (const cmd of cmds) {
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
				return execution.reply(
					`There was an error while executing this command: ${error.message}`
				);
			}
		}
	}

	getCommandsByLabel(label: string) {
		return this.commandStore.filter(
			c => c.name === label || c.aliases.includes(label)
		);
	}
}

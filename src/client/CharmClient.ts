import { Client, ClientOptions } from 'discord.js';

import { EventManager } from '../eventHandler/manager/EventManager';
import { CommandManager } from '../command/manager/CommandManager';
import { CoreModule } from '../module/CoreModule';
import { ModuleManager } from '../module/ModuleManager';

import { CharmOptions } from './CharmOptions';

export class CharmClient extends Client {
	commandManager: CommandManager;
	eventManager: EventManager;
	moduleManager: ModuleManager;

	config: Partial<CharmOptions>;

	constructor(options: Partial<CharmOptions>, discordOptions: ClientOptions) {
		super(discordOptions);

		this.commandManager = new CommandManager(this);
		this.eventManager = new EventManager(this);
		this.moduleManager = new ModuleManager(this);

		this.config = {
			prefix: options.prefix || 'c!',
		};

		this.moduleManager.registerModule(CoreModule);
	}
}

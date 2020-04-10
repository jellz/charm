import { Client, ClientOptions, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import Module from './module/Module';
import Command from './command/Command';
import EventHandler from './eventHandler/EventHandler';
import EventManager from './eventHandler/EventManager';
import CommandManager from './command/CommandManager';

import CoreModule from './module/CoreModule';
import ModuleManager from './module/ModuleManager';

interface CharmOptions {
	prefix: string | undefined;
}

export default class CharmClient extends Client {
	public commandManager: CommandManager;
	public eventManager: EventManager;
	public moduleManager: ModuleManager;

	public config: Partial<CharmOptions>;

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

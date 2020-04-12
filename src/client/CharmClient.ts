import { Client, ClientOptions } from 'discord.js';

import EventManager from '../eventHandler/manager/EventManager';
import CommandManager from '../command/manager/CommandManager';
import CoreModule from '../module/CoreModule';
import ModuleManager from '../module/ModuleManager';

import type CharmOptions from './CharmOptions';

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

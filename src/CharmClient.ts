import { Client, ClientOptions, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import Module from './Module';
import Command from './command/Command';
import EventHandler from './eventHandler/EventHandler';
import EventManager from './eventHandler/EventManager';
import CommandManager from './command/CommandManager';

import CoreModule from './CoreModule';

interface CharmOptions {
	prefix: string | undefined;
}

export default class CharmClient extends Client {
	public commandManager: CommandManager;
	public eventManager: EventManager;
	public modules: Collection<string, Module>;

	public config: Partial<CharmOptions>;

	constructor(options: Partial<CharmOptions>, discordOptions: ClientOptions) {
		super(discordOptions);

		this.commandManager = new CommandManager(this);
		this.eventManager = new EventManager(this);
		this.modules = new Collection();

		this.config = {
			prefix: options.prefix || 'c!',
		};

		this.registerModule(CoreModule);
	}

	registerModule(module: typeof Module) {
		if (module.name == 'Module')
			throw new TypeError(
				'Please register a module instead of the base Module class'
			);
		const mod = new module(this);
		mod.getEventHandlers().forEach((h: EventHandler) => {
			h.function = h.function.bind(mod);
			this.eventManager.registerEventHandler(h);
		});
		mod.getCommands().forEach((c: Command) => {
			c.function = c.function.bind(mod);
			this.commandManager.registerCommand(c);
		});
		this.modules.set(module.name, mod);
	}

	loadModules(folderPath: string) {
		const files = readdirSync(folderPath);
		files.forEach(file => {
			const fn = join(process.cwd(), folderPath, file);
			const module = require(fn);
			if (module.default) {
				if (Object.getPrototypeOf(module.default) == Module)
					this.registerModule(module.default);
				else
					throw new TypeError(
						`The module ${fn} does not export a Module by default`
					);
			} else {
				throw new Error(`The module ${fn} does not have a default export`);
			}
		});
	}
}

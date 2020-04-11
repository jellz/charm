import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import type CharmClient from '../..';
import type Command from '../command/Command';
import type EventHandler from '../eventHandler/EventHandler';

import Module from './Module';

export default class ModuleManager {
	private client: CharmClient;
	private moduleStore: Collection<string, Module>;

	constructor(client: CharmClient) {
		this.moduleStore = new Collection();

		this.client = client;
	}

	registerModule(module: typeof Module) {
		if (module.name === 'Module')
			throw new TypeError(
				'Please register a module instead of the base Module class'
			);
		let mod: Module;
		mod = new module(this.client);
		mod.getEventHandlers().forEach((h: EventHandler) => {
			h.function = h.function.bind(mod);
			this.client.eventManager.registerEventHandler(h);
		});
		mod.getCommands().forEach((c: Command) => {
			c.function = c.function.bind(mod);
			this.client.commandManager.registerCommand(c);
		});
		this.moduleStore.set(mod.id, mod);
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

	getModule(id: string) {
		return this.moduleStore.get(id);
	}
}

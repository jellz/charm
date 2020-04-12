import { Collection } from 'discord.js';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';

import type CharmClient from '../..';

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
		mod.getEventHandlers().forEach(h => {
			h.function = h.function.bind(mod);
			// console.log(h.id);
			this.client.eventManager.registerEventHandler(h);
		});
		mod.getCommands().forEach(c => {
			c.function = c.function.bind(mod);
			// console.log(c.id);
			this.client.commandManager.registerCommand(c);
		});
		this.moduleStore.set(mod.id, mod);
	}

	loadModules(folderPath: string) {
		const files = readdirSync(folderPath);
		files.forEach(file => {
      const modulePath = join(process.cwd(), folderPath, file);
      if (lstatSync(modulePath).isDirectory()) return this.loadModules(join(folderPath, file));
			const module = require(modulePath);
			if (module.default) {
				if (Object.getPrototypeOf(module.default) == Module)
					this.registerModule(module.default);
				else
					throw new TypeError(
						`The module ${modulePath} does not export a Module by default`
					);
			} else {
				throw new Error(`The module ${modulePath} does not have a default export`);
			}
		});
	}

	getModule(id: string) {
		return this.moduleStore.get(id);
	}
}

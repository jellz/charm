import 'reflect-metadata';

import { EventHandler } from '../eventHandler/EventHandler';
import { Command } from '../command/Command';

import { CharmClient } from '../..';
import { EventHandlerMetadata } from '../eventHandler/EventHandlerMetadata';
import { CommandMetadata } from '../command/CommandMetadata';

export class Module {
	client: CharmClient;
	id: string;

	constructor(client: CharmClient, id?: string) {
		this.client = client;
		this.id = id || this.constructor.name;
	}

	getEventHandlers() {
		const eventsMetadata: EventHandlerMetadata[] =
			Reflect.getMetadata('charm:eventsMetadata', this) || [];
		return eventsMetadata.map(
			m => new EventHandler(m.name, m.eventName, m.options, m.function, this)
		);
	}

	getCommands() {
		const commandsMetadata: CommandMetadata[] =
			Reflect.getMetadata('charm:commandsMetadata', this) || [];
		return commandsMetadata.map(
			m => new Command(m.name, m.options, m.function, this, m.params)
		);
	}
}

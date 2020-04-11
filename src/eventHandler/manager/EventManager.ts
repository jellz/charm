import { ClientEvents, Collection } from 'discord.js';

import type CharmClient from '../..';
import type EventHandler from '../EventHandler';

export default class EventManager {
	private eventStore: Collection<string, EventHandler>;
	private client: CharmClient;

	constructor(client: CharmClient) {
		this.eventStore = new Collection();

		this.client = client;
	}

	registerEventHandler(event: EventHandler) {
		if (!event.eventName)
			throw new TypeError(
				"You can't register an event that is missing a Discord.js event name"
			);
		this.client.on(event.eventName as keyof ClientEvents, (...params) =>
			event.function(...params)
		);
		this.eventStore.set(event.id, event);
	}

	getEventsByModule(modId: string) {
		return this.eventStore.array().filter(e => modId === e.module.id);
	}
}

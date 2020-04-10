import CharmClient from '../CharmClient';
import EventHandler from './EventHandler';
import { ClientEvents } from 'discord.js';

export default class EventManager {
	private eventStore: Map<string, EventHandler>;
	private client: CharmClient;

	constructor(client: CharmClient) {
		this.eventStore = new Map();
		this.client = client;
	}

	registerEventHandler(event: EventHandler) {
		if (!event.eventName)
      throw "You can't register an event that is missing a Discord.js event name";
    if (this.eventStore.get(event.id)) throw `An event already exists with this ID (${event.id})`;
		this.client.on(event.eventName as keyof ClientEvents, (...params) =>
			event.function(...params)
    );
    this.eventStore.set(event.id, event);
	}
}

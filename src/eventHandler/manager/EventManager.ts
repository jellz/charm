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

	registerEventHandler(handler: EventHandler) {
		if (!handler.eventName)
			throw new TypeError(
				"You can't register an event that is missing a Discord.js event name"
			);

    let handlerOverrode: EventHandler | undefined = this.eventStore.get(handler.id);
    if (handlerOverrode) {
      // console.log('overriding handler', handlerOverrode.id, handler.module.constructor.name);
      this.deregisterHandler(handlerOverrode);
    }
		handler.wrapperFunction = (...params: any[]) =>
			handler.function.apply(handler.module, params);
		this.client.on(
			handler.eventName as keyof ClientEvents,
			handler.wrapperFunction
		);
		this.eventStore.set(handler.id, handler);
	}

	deregisterHandler(handler: EventHandler) {
    if (!this.eventStore.has(handler.id)) throw Error('You cannot deregister a non-existent handler');
		const h: EventHandler = this.eventStore.get(handler.id)!;
		if (h.wrapperFunction)
			this.client.removeListener(h.eventName, h.wrapperFunction);
		this.eventStore.delete(h.id);
		return true;
	}
}

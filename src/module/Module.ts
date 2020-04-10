import 'reflect-metadata';
import CharmClient from '../CharmClient';

export default class Module {
	public client: CharmClient;
	public id: Symbol | string;

	constructor(client: CharmClient, id?: string) {
		this.client = client;
    this.id = id || Symbol(this.constructor.name);

    console.log(this.id);
	}

	getEventHandlers() {
		return Reflect.getMetadata('charm:eventsMetadata', this) || [];
	}

	getCommands() {
		return Reflect.getMetadata('charm:commandsMetadata', this) || [];
	}
}

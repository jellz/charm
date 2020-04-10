import 'reflect-metadata';
import CharmClient from './CharmClient';

export default class Module {
  public client: CharmClient;

  constructor(client: CharmClient) {
    this.client = client;
  }

	getEventHandlers() {
    return Reflect.getMetadata('charm:eventsMetadata', this) || [];
  }

  getCommands() {
    return Reflect.getMetadata('charm:commandsMetadata', this) || [];
  }
}

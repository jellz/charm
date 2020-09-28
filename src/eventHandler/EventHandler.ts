import { Module } from '../module/Module';
import { EventHandlerOptions } from './EventHandlerOptions';

export class EventHandler {
	name: string;
	eventName: string;
	options?: Partial<EventHandlerOptions>;
	function: Function;
	module: Module;
	wrapperFunction?: (...params: unknown[]) => void;

	// Handler options
	id: string;
	description?: string;

	constructor(
		name: string,
		eventName: string,
		options: Partial<EventHandlerOptions>,
		func: Function,
		module: Module
	) {
		this.name = name;
		// TODO : check if eventName is empty/wrong
		this.eventName = eventName;
		this.options = options;
		this.function = func;
		this.module = module;

		// Handler options
		this.description = this.options.description;
		this.id = this.options.id || `${this.module.id}/${this.name}`;
	}
}

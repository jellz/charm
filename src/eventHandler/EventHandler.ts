import Module from '../module/Module';
import HandlerOptions from './EventHandlerOptions';
import EventHandlerOptions from './EventHandlerOptions';

export default class EventHandler {
	public id: Symbol | string;
	public name: string;
	public eventName: string | null;
	public description: string | null;
	public module: Module;
	public function: Function;

	constructor(
		name: string,
		eventName: string,
		options: Partial<EventHandlerOptions>,
		func: Function,
		module: Module
	) {
		this.name = name;
		// TODO : check if eventName is empty/wrong
		if (!eventName)
			throw new TypeError('Event name is required in EventHandler constructor');
		else this.eventName = eventName || null;

		this.description = options.description || null;
		this.id = options.id || Symbol(this.name);

		this.module = module;
		this.function = func;
	}
}

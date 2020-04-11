import Module from '../module/Module';
import EventHandlerOptions from './EventHandlerOptions';

export default class EventHandler {
	public id: string;
	public name: string;
	public eventName: string | null;
	public description?: string;
	public module: Module;
  public function: Function;

	constructor(
		name: string,
		eventName: string,
		options: Partial<EventHandlerOptions>,
		func: Function,
    module: Module,
	) {
		this.name = name;
		// TODO : check if eventName is empty/wrong
		if (!eventName)
      throw new TypeError('Event name is required in EventHandler constructor');
		else this.eventName = eventName;

		this.module = module;

		this.description = options.description;

		this.id = options.id || `${this.module.id}/${this.name}`;
    this.function = func;
	}
}

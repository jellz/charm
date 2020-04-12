import type Module from '../module/Module';
import type EventHandlerOptions from './EventHandlerOptions';

export default class EventHandler {
	public name: string;
	public eventName: string;
	public options?: Partial<EventHandlerOptions>;
	public function: Function;
	public module: Module;
  public wrapperFunction?: (...params: any[]) => void;

  // Handler options
  public id: string;
	public description?: string;

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

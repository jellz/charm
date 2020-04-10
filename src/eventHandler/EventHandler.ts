import Module from '../Module';
import HandlerOptions from './EventHandlerOptions';
import EventHandlerOptions from './EventHandlerOptions';

export default class EventHandler {
	public id: string;
	public eventName: string | null;
	public description: string | null;
	public module: Module;
	public function: Function;

	constructor(name: string, eventName: string, options: Partial<EventHandlerOptions>, func: Function, module: Module) {
    this.id = name;
    // TODO : check if eventName is empty/wrong
    this.eventName = eventName || null;
    this.description = options.description || null;
    
    this.module = module;
    this.function = func;
  }
}

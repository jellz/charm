import { EventHandlerOptions } from './EventHandlerOptions';

export interface EventHandlerMetadata {
	name: string;
	eventName: string;
	options: Partial<EventHandlerOptions>;
	function: Function;
}

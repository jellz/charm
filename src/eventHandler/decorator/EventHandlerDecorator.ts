import { Module } from '../../module/Module';
import { EventHandlerOptions } from '../EventHandlerOptions';
import { EventHandlerMetadata } from '../EventHandlerMetadata';

export function EventHandler(
	eventName: string,
	options: Partial<EventHandlerOptions> | undefined = {}
) {
	return function (
		target: Module,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const eventHandler: EventHandlerMetadata = {
			name: propertyKey,
			eventName,
			options,
			function: descriptor.value,
		};
		const eventsMetadata: EventHandlerMetadata[] =
			Reflect.getMetadata('charm:eventsMetadata', target) || [];
		eventsMetadata.push(eventHandler);
		Reflect.defineMetadata('charm:eventsMetadata', eventsMetadata, target);
	};
}

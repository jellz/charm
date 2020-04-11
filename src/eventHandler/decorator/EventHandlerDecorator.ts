import type Module from '../../module/Module';
import type EventHandlerOptions from '../EventHandlerOptions';
import type EventHandlerMetadata from '../EventHandlerMetadata';

export default function EventHandler(
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

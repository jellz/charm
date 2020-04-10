import Module from '../Module';
import EventHandlerOptions from './EventHandlerOptions';
import { default as EventHandlerClass } from './EventHandler';

export default function EventHandler(
	eventName: string,
	options: Partial<EventHandlerOptions> | undefined = {}
) {
	return function (
		target: Module,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const eventHandler = new EventHandlerClass(
      propertyKey,
      eventName,
			options,
			descriptor.value,
			target
		);
		const eventsMetadata =
			Reflect.getMetadata('charm:eventsMetadata', target) || [];
		eventsMetadata.push(eventHandler);
		Reflect.defineMetadata('charm:eventsMetadata', eventsMetadata, target);
	};
}

import Module from '../Module';
import CommandOptions from './CommandOptions';
import { default as CommandClass } from './Command';

export default function Command(
	options: Partial<CommandOptions> | undefined = {}
) {
	return function (
		target: Module,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const cmd = new CommandClass(propertyKey, options, descriptor.value, target);
		const commandsMetadata =
			Reflect.getMetadata('charm:commandsMetadata', target) || [];
		commandsMetadata.push(cmd);
		Reflect.defineMetadata('charm:commandsMetadata', commandsMetadata, target);
	};
}

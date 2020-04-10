import Module from '../Module';
import CommandOptions from './CommandOptions';
import { default as CommandClass } from './Command';
import { GuildMember, User } from 'discord.js';

export default function Command(
	options: Partial<CommandOptions> | undefined = {}
) {
	return function (
		target: Module,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
    const params = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    params.shift();
    console.log(params);

		const cmd = new CommandClass(propertyKey, options, descriptor.value, target, params);
		const commandsMetadata =
			Reflect.getMetadata('charm:commandsMetadata', target) || [];
		commandsMetadata.push(cmd);
    Reflect.defineMetadata('charm:commandsMetadata', commandsMetadata, target);
	};
}

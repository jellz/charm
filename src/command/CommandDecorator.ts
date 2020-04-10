import Module from '../module/Module';
import CommandOptions from './CommandOptions';
import { default as CommandClass } from './Command';
import { GuildMember, User } from 'discord.js';
import CommandParameter from './CommandParameter';

export default function Command(
	options: Partial<CommandOptions> | undefined = {}
) {
	return function (
		target: Module,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const params = Reflect.getMetadata(
			'design:paramtypes',
			target,
			propertyKey
		);
		// params.shift();
		const builtParams: CommandParameter[] = params.map((p: Function) => {
			return {
				fn: p,
				optional: false,
			};
		});

		const optionals: number[] =
			Reflect.getMetadata(
				'charm:optionalCommandArguments',
				target,
				propertyKey
			) || [];

		for (let i = 0; i < builtParams.length; i++) {
			if (optionals.includes(i)) builtParams[i].optional = true;
		}

    if (builtParams[0].optional) throw new TypeError('The first parameter cannot be optional');

		let lastOptional: boolean | null = null;
		for (let i = builtParams.length - 1; i > 0; i--) {
			if (builtParams.length <= 1) return;
			if (lastOptional == null) lastOptional = builtParams[i].optional;
			else if (lastOptional) lastOptional = builtParams[i].optional;
			else if (!lastOptional && builtParams[i].optional)
				throw new TypeError('Only last parameters can be optional');
		}
		// console.log(`list of CommandParameter for ${propertyKey}`, builtParams);

		const cmd = new CommandClass(
			propertyKey,
			options,
			descriptor.value,
			target,
			builtParams
		);
		const commandsMetadata =
			Reflect.getMetadata('charm:commandsMetadata', target) || [];
		commandsMetadata.push(cmd);
		Reflect.defineMetadata('charm:commandsMetadata', commandsMetadata, target);
	};
}

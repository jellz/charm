import Module from '../../module/Module';

export default function Optional(
	target: Object,
	propertyKey: string | symbol,
	parameterIndex: number
) {
	const targetConstructorName = target.constructor.name;
	if (!(target instanceof Module))
		throw new TypeError(`${targetConstructorName} doesn't extend Module`);
	const descriptor = Reflect.getOwnPropertyDescriptor(target, propertyKey);
	if (descriptor?.value.constructor.name !== 'Function')
		throw new TypeError(
			'The decorator must be applied to a function parameter'
		);
	const arr: number[] =
		Reflect.getMetadata(
			'charm:optionalCommandArguments',
			target,
			propertyKey
		) || [];
	arr.push(parameterIndex);
	Reflect.defineMetadata(
		'charm:optionalCommandArguments',
		arr,
		target,
		propertyKey
	);
}

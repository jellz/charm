import CommandOptions from './CommandOptions';
import Module from '../Module';

export default class Command {
	public function: Function;

	public id: string;
	public aliases: string[] | string[];
	public description: string | null;
	public module: Module;

	constructor(
		id: string,
		options: Partial<CommandOptions>,
		func: Function,
		module: Module
	) {
		this.aliases = options.aliases || [];
		this.description = options.description || null;

		this.function = func;
		this.id = id;
		this.module = module;
	}
}

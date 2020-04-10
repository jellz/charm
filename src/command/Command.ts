import CommandOptions from './CommandOptions';
import Module from '../module/Module';

export default class Command {
	public readonly id: string;
	public function: Function;

	// Command Options
	public aliases: string[] | string[];
	public description: string | null;
	public restLastParameter: boolean;

	public module: Module;
	public readonly params: any[];

	constructor(
		id: string,
		options: Partial<CommandOptions>,
		func: Function,
		module: Module,
		params: any[]
	) {
		this.aliases = options.aliases || [];
		this.description = options.description || null;
		this.restLastParameter = options.restLastParameter || false;

		this.id = id;
		this.function = func;
		this.module = module;
		this.params = params;
	}
}

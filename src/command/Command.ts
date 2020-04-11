import CommandOptions from './CommandOptions';
import Module from '../module/Module';
import CommandParameter from './CommandParameter';

export default class Command {
	public id: string;
	public name: string;
	public function: Function;

	// Command Options
	public aliases: string[] | string[];
	public description: string | null;
	public restLastParameter: boolean;

	public module: Module;
	public readonly params: CommandParameter[];

	constructor(
		name: string,
		options: Partial<CommandOptions>,
		func: Function,
		module: Module,
    params: CommandParameter[],
	) {
		this.aliases = options.aliases || [];
		this.description = options.description || null;
		this.restLastParameter = options.restLastParameter || false;

		this.module = module;

		this.name = options.name || name;
		this.id = options.id || `${this.module.id}/${this.name}`;

		this.function = func;
		this.params = params;
	}
}

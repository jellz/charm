import CommandOptions from './CommandOptions';
import Module from '../module/Module';
import CommandParameter from './CommandParameter';

export default class Command {
	public readonly id: string;
	public function: Function;

	// Command Options
	public aliases: string[] | string[];
	public description: string | null;
	public restLastParameter: boolean;

	public module: Module;
	public readonly params: CommandParameter[];

	constructor(
		id: string,
		options: Partial<CommandOptions>,
		func: Function,
		module: Module,
		params: CommandParameter[],
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

import CommandOptions from './CommandOptions';
import Module from '../module/Module';
import CommandParameter from './CommandParameter';
import CommandExecution from './execution/CommandExecution';

export default class Command {
	options: Partial<CommandOptions>;
	name: string;
	function: (e: CommandExecution, ...params: any[]) => boolean;
	module: Module;
	readonly params: CommandParameter[];
	overriding?: boolean;

	id: string;

	// Command options
	aliases: string[];
	description?: string;
	restLastParameter: boolean;

	constructor(
		name: string,
		options: Partial<CommandOptions>,
		func: (e: CommandExecution, ...params: any[]) => boolean,
		module: Module,
		params: CommandParameter[]
	) {
		this.options = options;
		this.name = this.options.name || name;
		this.function = func;
		this.module = module;
		this.params = params;

		this.id = options.id || `${this.module.id}/${this.name}`;

		// Command options
		this.aliases = this.options.aliases || [];
		this.description = this.options.description;
		this.restLastParameter = this.options.restLastParameter || false;
	}
}

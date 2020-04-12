import type CommandOptions from './CommandOptions';
import type Module from '../module/Module';
import type CommandParameter from './CommandParameter';
import type CommandExecution from '../command/CommandExecution';

export default class Command {
	public options: Partial<CommandOptions>;
	public name: string;
	public function: (e: CommandExecution, ...params: any[]) => boolean;
	public module: Module;
  public readonly params: CommandParameter[];
  public overriding?: boolean;

	public id: string;

	// Command options
	public aliases: string[];
	public description?: string;
	public restLastParameter: boolean;

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

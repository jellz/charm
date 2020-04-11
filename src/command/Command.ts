import CommandOptions from './CommandOptions';
import Module from '../module/Module';
import CommandParameter from './CommandParameter';

export default class Command {
  public options: Partial<CommandOptions>;
	public name: string;
	public function: Function;
	public module: Module;
	public readonly params: CommandParameter[];

  public id: string;

	// Command options
	public aliases: string[];
	public description?: string;
	public restLastParameter: boolean;

	constructor(
		name: string,
		options: Partial<CommandOptions>,
		func: Function,
		module: Module,
    params: CommandParameter[],
	) {
    this.options = options;
		this.name = this.options.name || name;
		this.function = func;
    this.module = module;
		this.params = params;

    this.id = options.id || `${this.module.id}/${this.name}`;

    // Command options
    this.aliases = options.aliases || [];
		this.description = options.description;
		this.restLastParameter = options.restLastParameter || false;
	}
}

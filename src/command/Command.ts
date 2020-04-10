import CommandOptions from './CommandOptions';
import Module from '../Module';

export default class Command {
	public function: Function;

	public id: string;
	public aliases: string[] | string[];
	public description: string | null;
  public module: Module;
  public restLastParameter: boolean;

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

		this.function = func;
		this.id = id;
    this.module = module;
    
    this.params = params;
	}
}

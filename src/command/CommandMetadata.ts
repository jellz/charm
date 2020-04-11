import type CommandOptions from './CommandOptions';
import type CommandParameter from './CommandParameter';

export default interface CommandMetadata {
	name: string;
	params: CommandParameter[];
	options: Partial<CommandOptions>;
	function: Function;
}

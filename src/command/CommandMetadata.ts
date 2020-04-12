import type CommandOptions from './CommandOptions';
import type CommandParameter from './CommandParameter';
import type CommandExecution from './execution/CommandExecution';

export default interface CommandMetadata {
	name: string;
	params: CommandParameter[];
	options: Partial<CommandOptions>;
	function: (e: CommandExecution, ...args: any[]) => boolean;
}

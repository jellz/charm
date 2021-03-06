import { CommandOptions } from './CommandOptions';
import { CommandParameter } from './CommandParameter';
import { CommandExecution } from './execution/CommandExecution';

export interface CommandMetadata {
	name: string;
	params: CommandParameter[];
	options: Partial<CommandOptions>;
	function: (e: CommandExecution, ...args: unknown[]) => boolean;
}

import CommandOptions from "./CommandOptions";
import CommandParameter from "./CommandParameter";

export default interface CommandMetadata {
  name: string,
  params: CommandParameter[],
  options: Partial<CommandOptions>,
  function: Function,
}
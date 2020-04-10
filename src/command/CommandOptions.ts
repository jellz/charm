export default interface CommandOptions {
	aliases: string[];
  description: string;
  restLastParameter: boolean;
  id: string;
  name: string;
}
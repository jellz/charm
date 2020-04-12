export default interface CommandOptions {
	name?: string;
	id?: string;
	aliases?: string[];
	description?: string;
	restLastParameter?: boolean;
}

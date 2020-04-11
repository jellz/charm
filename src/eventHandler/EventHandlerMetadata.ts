import EventHandlerOptions from "./EventHandlerOptions";

export default interface EventHandlerMetadata {
  name: string;
  eventName: string;
  options: Partial<EventHandlerOptions>;
  function: Function;
}

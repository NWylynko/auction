import { BaseEvent } from "../BaseEvent";

interface Dependency {
  getCurrentTimestamp: () => number;
}

export const createEvent = ({ getCurrentTimestamp }: Dependency) => <
  Events extends BaseEvent<string, any>, 
  Type extends Events["type"], 
  Payload extends Object
  >(type: Type, payload: Payload): BaseEvent<Type, Payload> => ({
  type,
  timestamp: getCurrentTimestamp(),
  payload
});

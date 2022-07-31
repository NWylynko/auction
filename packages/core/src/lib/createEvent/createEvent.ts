import { BaseEvent } from "../BaseEvent";

interface Dependency {
  generateId: () => string;
  getCurrentTimestamp: () => number;
}

export const createEvent = ({ generateId, getCurrentTimestamp }: Dependency) => <
  Events extends BaseEvent<string, any>, 
  Type extends Events["type"], 
  Payload extends Object
  >(type: Type, payload: Payload): BaseEvent<Type, Payload> => ({
    id: generateId(),
    type,
    timestamp: getCurrentTimestamp(),
    payload
  });

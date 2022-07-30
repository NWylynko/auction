import type { Implementation } from "./Implementation";
import type { Event, Events, EventTypes } from "../features/bidders/events";

// the functions here are called twice
// the first set of params are specific to the implementation
// for example you may want to put a database connection in here
// the second are the params called by the core logic code
// they can not have any implementation specific logic
// then the code is implantation specific
// using both the implementation specific params and the core logic params
// this then needs to do whatever side effects are needed
// and return the response that is expected by the core logic
export const defaultImplementation: Implementation<Events> = {
  createEventArray: async (initialEvents: Events): Promise<Events> => [...initialEvents],
  addEvent: (events: Events) => async (event: Event): Promise<void> => { events.push(event) },
  getEvents: (events: Events) => async (): Promise<Events> => events,
  getEventsOfType: (events: Events) => async (type: EventTypes): Promise<Events> => events.filter(event => event.type === type) ?? [],
}

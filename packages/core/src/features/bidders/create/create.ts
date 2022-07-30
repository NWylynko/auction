import { Implementation } from "../../../implementation";
import { createNewBidderEvent, Event, EventTypes } from "../events";

export interface BidderProps {
  name: string;
}

export interface Bidder {
  getEvents: () => Promise<Event[]>;
  getEventsOfType: (type: EventTypes) => Promise<Event[]>;
  addEvent: (event: Event) => Promise<void>;
}

export const createBidder = <T,> ({ createEventArray, addEvent, getEvents, getEventsOfType }: Implementation<T>) => async ({ name }: BidderProps): Promise<Bidder> => {

  // state could be literally anything
  // normally it would be a userId
  // or it could be the array of events
  const state = await createEventArray([
    createNewBidderEvent({ name })
  ]);

  return {
    getEvents: getEvents(state),
    addEvent: addEvent(state),
    getEventsOfType: getEventsOfType(state)
  }
}

import { addBiddersBalance, getBiddersBalance, getBiddersName } from "..";
import { Implementation } from "../../../implementation";
import { createNewBidderEvent, Event, EventTypes } from "../events";

export interface BidderProps {
  userId: string;
}

export interface Bidder {
  getEvents: () => Promise<Event[]>;
  getEventsOfType: (type: EventTypes) => Promise<Event[]>;
  addEvent: (event: Event) => Promise<void>;
}

export const findBidder = <T,> (funcs: Implementation<T>) => async (identifier: T) => {

  // state could be literally anything
  // normally it would be a userId
  // or it could be the array of events
  const state = await funcs.findEventStream(identifier);

  // these are the implementation details
  const getEvents = funcs.getEvents(state)
  const addEvent = funcs.addEvent(state)
  const getEventsOfType = funcs.getEventsOfType(state)

  const bidder = {
    getEvents,
    addEvent,
    getEventsOfType,
  }

  // this is the core logic
  const getName = getBiddersName(bidder)
  const getBalance = getBiddersBalance(bidder)
  const addBalance = addBiddersBalance(bidder)

  return {
    ...bidder,
    getName,
    getBalance,
    addBalance
  }
}

import type { BidderEvent, BidderEvents, BidderEventTypes } from "../";

export type Implementation<T> = {
  createEventArray: (initialEvents: BidderEvents) => Promise<T>;
  getEvents: (state: T) => () => Promise<BidderEvents>;
  getEventsOfType: (state: T) => (type: BidderEventTypes) => Promise<BidderEvents>;
  addEvent: (state: T) => (event: BidderEvent) => Promise<void>;
};

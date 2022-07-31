import type { BidderEvent, BidderEvents, BidderEventTypes } from "../";

// we want to keep these to the minimal
// this is because every time we add a function here
// the implementation details of the consumer will need to be updated
// so keeping these at the bare essentials helps

// there are three things that need to be balanced here
// 1. don't allow implementation details to seep in to the core logic
// 2. don't allow the core logic to depend on implementation details
// 3. don't make things really slow (aka optimisation)
//    - when using things like databases, there is generally many ways
//      to achieve the same thing. Some are faster and some are slower
//      this is great when using the implementation directly, as you
//      can pick and choice the best for the job. But the issue is we
//      are not allowed to tie the core logic to the implementation so
//      this is a balancing act. The best way to manage this is to test
//      many different implementations.
export type Implementation<T> = {
  createEventStream: (initialEvents: BidderEvents) => Promise<T>;
  findEventStream: (state: T) => Promise<T>;
  getEvents: (state: T) => () => Promise<BidderEvents>;
  getEventsOfType: (state: T) => (type: BidderEventTypes) => Promise<BidderEvents>;
  addEvent: (state: T) => (event: BidderEvent) => Promise<void>;
};

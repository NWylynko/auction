
export type { Bidder } from './create';
export type { 
  Events as BidderEvents, 
  Event as BidderEvent,
  EventTypes as BidderEventTypes
} from "./events";

export { createBidder } from "./create/create";
export { getName as getBiddersName } from "./getters/name";
export { getBalance as getBiddersBalance } from "./getters/balance";
export { addBalance as addBiddersBalance } from './addBalance/addBalance';

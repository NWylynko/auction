import { createBidder } from "./features/bidders"
import { Implementation } from "./implementation";

export const createAuctionHouse = <T, > (i: Implementation<T>) => {

  const bidders = {
    create: createBidder<T>({
      createEventArray: i.createEventArray,
      addEvent: i.addEvent,
      getEvents: i.getEvents,
      getEventsOfType: i.getEventsOfType
    })
  }

  return {
    bidders
  }
}
import { createBidder } from "./features/bidders"
import { Implementation } from "./implementation";

export const createAuctionHouse = <T, > (funcs: Implementation<T>) => {

  const bidders = {
    create: createBidder(funcs)
  }

  return {
    bidders
  }
}
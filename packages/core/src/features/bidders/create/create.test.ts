import { expect, it } from 'vitest';
import { createAuctionHouse } from '../../../createAuctionHouse';
import { defaultImplementation } from '../../../implementation/default';
import { createBidder } from './create';

it("create a new bidder", async () => {

  const auctionHouse = createAuctionHouse(defaultImplementation)

  const name = "John";

  const bidder = await auctionHouse.bidders.create({ name })
  const biddersName = await bidder.getName()
  const biddersBalance = await bidder.getBalance()

  expect(biddersName).toEqual(name)
  expect(biddersBalance).toEqual(0)

})
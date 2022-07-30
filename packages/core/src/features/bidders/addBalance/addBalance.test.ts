import { expect, it } from "vitest";
import { createAuctionHouse } from "../../../createAuctionHouse";
import { defaultImplementation } from "../../../implementation/default";

it("should calculate the balance of the bidder", async () => {

  const auctionHouse = createAuctionHouse(defaultImplementation);

  const bidder = await auctionHouse.bidders.create({ name: "John" });

  expect(await bidder.getBalance()).toEqual(0);

  await bidder.addBalance(100);

  expect(await bidder.getBalance()).toEqual(100);

  await bidder.addBalance(200);

  expect(await bidder.getBalance()).toEqual(300);
  
}) 

it("should throw an error if amount is 0 or less", async () => {

  const auctionHouse = createAuctionHouse(defaultImplementation);

  const bidder = await auctionHouse.bidders.create({ name: "John" });

  await bidder.addBalance(1);

  await expect(bidder.addBalance(-1)).rejects.toThrow("Amount must be greater than 0");

})
import { expect, it } from "vitest";
import { addBalance, createAuctionHouse, getBiddersName, getBiddersBalance } from '.';
import type { BidderEvent } from ".";
import { v4 as uuid } from "uuid";
import { defaultImplementation } from "./implementation/default"

it("create a new auction house", async () => {
  const auctionHouse = createAuctionHouse(defaultImplementation);

  const bidder = await auctionHouse.bidders.create({ name: "John" });

  const name = await getBiddersName(bidder);

  expect(name).toEqual("John");
})

// this implementation shows the use of a shared event stream
// instead of a dedicated event stream for each bidder

type CustomBidderEvent = BidderEvent & {
  userId: string;
}

it("use a custom implementation", async () => {

  const events: CustomBidderEvent[] = [];

  const auctionHouse = createAuctionHouse({
    createEventArray: async (initialEvents) => {

      const userId = uuid();

      initialEvents.map(event => {
        const customEvent = {
          userId,
          ...event,
        }
        events.push(customEvent);
      });

      // so you can basically return anything here
      // by default it just returns the events array
      // but here we are sharing an events array
      // so I have returned the userId
      // this would be much more typical in a real world scenario
      return userId

    },
    addEvent: (userId) => async (event) => {
      events.push({ userId, ...event });
    },
    getEvents: (userId) => async () => {
      return events.filter(event => event.userId === userId);
    },
    getEventsOfType: (userId) => async (type) => {
      return events.filter(event => event.userId === userId && event.type === type)
    }
  })

  const bidder = await auctionHouse.bidders.create({ name: "John" });
  const bidder2 = await auctionHouse.bidders.create({ name: "Josh" });

  const name = await getBiddersName(bidder);

  expect(name).toEqual("John");

  await addBalance(bidder2, 50);
  await addBalance(bidder2, 100);

  const balance = await getBiddersBalance(bidder2);

  expect(balance).toEqual(150);
})
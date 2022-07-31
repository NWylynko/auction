import { expect, it } from "vitest";
import { createAuctionHouse } from '.';
import type { BidderEvent } from ".";
import { v4 as uuid } from "uuid";
import { defaultImplementation } from "./implementation/default"
import { getBiddersBalance } from "./features/bidders";

it("create a new auction house", async () => {
  const auctionHouse = createAuctionHouse(defaultImplementation);

  const bidder = await auctionHouse.bidders.create({ name: "John" });

  const name = await bidder.getName();

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
    createEventStream: async (initialEvents) => {

      const userId = uuid();

      initialEvents.map(event => {
        events.push({ ...event, userId });
      });

      // so you can basically return anything here
      // by default it just returns the events array
      // but here we are sharing an events array
      // so I have returned the userId
      // this would be much more typical in a real world scenario
      return userId

    },
    findEventStream: async (userId) => {
      return userId;
    },
    addEvent: (userId) => async (event) => {
      events.push({ ...event, userId });
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

  const name = await bidder.getName();

  expect(name).toEqual("John");

  await bidder2.addBalance(100);
  await bidder2.addBalance(50);

  // this is the question, which is a better api to use?
  // having the functions on the bidder object means they are easy to access
  // but it takes up memory binding all those functions to every bidder
  // also, all the functions are on the bidder regardless of if you use them
  const balance = await bidder2.getBalance();
  // on the other hand we can import the function and pass in the bidder as an argument
  // this means less memory usage as the function is only use when necessary
  // plus we only import the functions needed, no extra
  const balance2 = await getBiddersBalance(bidder2)();
  // on one hand the functions bound to the bidder are easier to use
  // but we have seen more apis move towards the second option
  // this is because we want to keep bundle size down
  // and only include whats necessary

  // the argument really comes down too (and I don't think we should do both)
  // is does the bidder object just hold the implementation details / functions
  // in which case they are exposed to the developer to use if they want (but they shouldn't)
  // or does the bidder hold them, pass them through to the core logic functions
  // and pass the handlers to call those functions we want the developer to use

  console.log({ bidder2 })

  console.log({ balance, balance2 })

  expect(balance).toEqual(150);
  expect(balance2).toEqual(150);
})
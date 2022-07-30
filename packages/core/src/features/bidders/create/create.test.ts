import { expect, it } from 'vitest';
import { createBidder } from './create';

// it("create a new bidder", async () => {
//   const name = "John";
//   const bidder = await createBidder({ name })
//   const events = await bidder.getEvents();

//   // the first event of a new bidder should be newBidder
//   expect(events[0].type).toEqual("newBidder");
// })
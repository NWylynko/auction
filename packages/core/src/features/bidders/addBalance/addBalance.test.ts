import { expect, it } from "vitest";
import { createBidder, getBiddersBalance } from "../index";
import { addBalance } from "./addBalance";

// it("should calculate the balance of the bidder", async () => {
//   const bidder = await createBidder({ name: "John" });

//   expect(await getBiddersBalance(bidder)).toEqual(0);

//   await addBalance(bidder, 100);

//   expect(await getBiddersBalance(bidder)).toEqual(100);

//   await addBalance(bidder, 200);

//   expect(await getBiddersBalance(bidder)).toEqual(300);
  
// })
import { expect, it } from "vitest";
import { createBidder, getBiddersBalance, getBiddersName } from "."

// it("should create a bidder and get there name", async () => {
//   const user = await createBidder({ name: "John" });
//   const name = await getBiddersName(user);
//   const balance = await getBiddersBalance(user);

//   expect(name).toEqual("John");
//   expect(balance).toEqual(0);
// })
import { createAddBalanceEvent } from "../events";
import { Bidder } from "../index";

export const addBalance = (bidder: Bidder) => async (amount: number) => {

  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  const event = createAddBalanceEvent({ amount });
  await bidder.addEvent(event);
}
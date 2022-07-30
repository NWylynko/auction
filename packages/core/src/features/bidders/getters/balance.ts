import { Bidder } from "../create";

export const getBalance = async (bidder: Bidder): Promise<number> => {

  const events = await bidder.getEventsOfType("addBalance");

  const balance = events.reduce((balance, event) => {
    if (event.type === "addBalance") {
      return balance + event.payload.amount;
    }
    return balance;
  }, 0);

  return balance;
}
import { Bidder } from "../create";

export const getBalance = (bidder: Bidder) => async (): Promise<number> => {

  const events = await bidder.getEventsOfType("addBalance");

  console.log({ events })

  const balance = events.reduce((balance, event) => {
    if (event.type === "addBalance") {
      return balance + event.payload.amount;
    } else if (event.type === "withdrawBalance") {
      return balance - event.payload.amount;
    }
    return balance;
  }, 0);

  return balance;
}
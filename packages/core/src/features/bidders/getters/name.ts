import { Bidder } from "../create";

export const getName = async (bidder: Bidder): Promise<string> => {

  const events = await bidder.getEventsOfType("newBidder");

  const name = events.reduce((name, event) => {
    if (event.type === "newBidder") {
      return event.payload.name
    }
    return name;
  }, "");

  if (name === "") {
    throw new Error("Bidder has no name");
  }
  
  return name;
}
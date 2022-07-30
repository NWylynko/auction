
import { expect, it } from "vitest";
import { createEvent } from "./createEvent";

it("should create a new event", () => {

  // dependency
  const getCurrentTimestamp = () => 0;

  // create function
  const main = createEvent({ getCurrentTimestamp });

  // fake data
  const eventName = "myEvent";
  const name = "John";
  const timestamp = getCurrentTimestamp();

  // call function
  const event = main(eventName, { name });

  // assert
  expect(event.type).toEqual(eventName);
  expect(event.timestamp).toEqual(timestamp);
  expect(event.payload.name).toEqual(name);
})
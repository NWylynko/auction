
import { expect, it } from "vitest";
import { createEvent } from "./createEvent";

it("should create a new event", () => {

  // dependency
  const getCurrentTimestamp = () => 0;
  const generateId = () => "id";

  // create function
  const main = createEvent({ getCurrentTimestamp, generateId });

  // fake data
  const eventName = "myEvent";
  const name = "John";
  const timestamp = getCurrentTimestamp();
  const id = generateId();

  // call function
  const event = main(eventName, { name });

  // assert
  expect(event.type).toEqual(eventName);
  expect(event.timestamp).toEqual(timestamp);
  expect(event.payload.name).toEqual(name);
  expect(event.id).toEqual(id);
})
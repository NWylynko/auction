import { createEvent as _createEvent } from "./createEvent";
import { v4 as uuid } from "uuid";

const getCurrentTimestamp = Date.now
const generateId = uuid

export const createEvent = _createEvent({ 
  getCurrentTimestamp, 
  generateId
});
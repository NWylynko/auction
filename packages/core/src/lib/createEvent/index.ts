import { createEvent as _createEvent } from "./createEvent";

const getCurrentTimestamp = Date.now

export const createEvent = _createEvent({ getCurrentTimestamp });
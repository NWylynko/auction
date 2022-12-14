import type { BaseEvent } from "../../lib/BaseEvent";
import { createEvent } from "../../lib/createEvent";

export type NewBidder = BaseEvent<"newBidder", { name: string }>
export type AddBalance = BaseEvent<"addBalance", { amount: number }>
export type WithdrawBalance = BaseEvent<"withdrawBalance", { amount: number }>

export type Event = NewBidder | AddBalance | WithdrawBalance;
export type Events = Event[]
export type EventTypes = Event["type"]

export const createNewBidderEvent = (payload: NewBidder["payload"]): NewBidder => createEvent("newBidder", payload);
export const createAddBalanceEvent = (payload:  AddBalance["payload"]): AddBalance => createEvent("addBalance", payload);
export const createWithdrawBalanceEvent = (payload: WithdrawBalance["payload"]): WithdrawBalance => createEvent("withdrawBalance", payload);
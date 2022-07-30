export type BaseEvent<Type extends string, T> = { type: Type; timestamp: number; payload: T; };



export type BaseEvent<Type extends string, T> = { id: string, type: Type; timestamp: number; payload: T; };



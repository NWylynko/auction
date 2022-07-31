import { open } from 'sqlite'
import { BidderEvent, BidderEventTypes } from '..';
import type { Implementation } from './Implementation'
import SQL from "sql-template-strings";
import { v4 as uuid } from "uuid";

// this should be moved to another package

type Database = Awaited<ReturnType<typeof open>>

export const sqliteConnector = (database: Database) => {

  const createEventStream = async (initialEvents: BidderEvent[]) => {
        
    const userId = uuid()

    await Promise.all(initialEvents.map(event => addEvent(userId)(event)));

    return userId;

  }

  const addEvent = (userId: string) => async (event: BidderEvent) => {
        
    const { type, timestamp } = event

    const payload = JSON.stringify(event.payload)

    await database.run(SQL`
      INSERT INTO events (
        userId, type, payload, timestamp
      ) VALUES (
        ${userId}, ${type}, ${payload}, ${timestamp}
      )
    `);

  }

  const parseRows = (rows: any[]) => rows.map(row => {
    const { type, payload, timestamp } = row
    return { type, payload: JSON.parse(payload), timestamp }
  });

  const getEvents = (userId: string) => async () => {
    const rows = await database.all(SQL`
      SELECT * FROM events WHERE userId = ${userId}
    `);

    return parseRows(rows);
  }

  const getEventsOfType = (userId: string) => async (type: BidderEventTypes) => {
    const rows = await database.all(SQL`
      SELECT * FROM events WHERE userId = ${userId} AND type = ${type}
    `);

    return parseRows(rows);
  }

  // pass in a string here to hold the users ID
  const connector: Implementation<string> = {
    createEventStream,
    addEvent,
    getEvents,
    getEventsOfType
  }

  const createTable = async () => {
    await database.exec(SQL`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        userId TEXT,
        type TEXT,
        payload TEXT,
        timestamp INTEGER
      );
      CREATE INDEX IF NOT EXISTS events_userId_type ON events (userId, type);
    `);
  }

  return { connector, createTable, database }
}
import { expect, it } from 'vitest';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { sqliteConnector } from "./sqlite"
import { createAuctionHouse } from '..';

it("sqlite implementation", async () => {

  const database = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  })

  const { connector, createTable } = sqliteConnector(database)

  await createTable();

  const auctionHouse = createAuctionHouse(connector);

  const john = await auctionHouse.bidders.create({ name: "John" });
  const josh = await auctionHouse.bidders.create({ name: "Josh" });

  expect(await john.getName()).toEqual("John");

  expect(await josh.getBalance()).toEqual(0);

  josh.addBalance(100);

  expect(await josh.getBalance()).toEqual(100);

})
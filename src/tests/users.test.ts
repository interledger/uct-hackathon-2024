/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCaller } from "$/src/server/api/root";
import { cleanUpDatabase, createTestContext } from "$/src/utils/tests/tests";
import { beforeEach, describe, test, expect } from "vitest";

let ctx: any;

describe("users", () => {
  beforeEach(async () => {
    ctx = await createTestContext(true);
    await cleanUpDatabase(ctx.db);
  });

  test("create a user", async () => {
    const ctx = await createTestContext(true);

    const caller = createCaller(ctx);
    const usersResponse = await caller.users.get({});
    const users = usersResponse.data;

    expect(users.length).toEqual(1);
    expect(users[0]?.userId).toEqual(ctx.session?.userId);
  });
});

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCaller } from "$/src/server/api/root";
import { cleanUpDatabase, createTestContext } from "$/src/utils/tests/tests";
import { beforeEach, describe, test, expect } from "vitest";

let ctx: any;

describe("campaigns", () => {
  beforeEach(async () => {
    ctx = await createTestContext(true);
    await cleanUpDatabase(ctx.db);
  });

  test("create a campaign", async () => {
    const ctx = await createTestContext(true);

    const caller = createCaller(ctx);
    const campaignsResponse = await caller.campaigns.createCampaign({
      userId: ctx.session!.userId,
      title: "campaign 1",
      about: "my campaign",
      amount: 100,
    });
    const campaign = campaignsResponse.data;

    expect(campaign.title).toEqual("campaign 1");
  });
});

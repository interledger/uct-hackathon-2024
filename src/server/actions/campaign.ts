/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "$/src/server/db";
import { type Response } from "$/src/utils/types";

export async function createCampaign(previousState: any, formData: FormData) {
  const response: Response = {
    success: true,
    message: "Campaign Successfully Created",
    data: {},
  };

  const id = formData.get("id")?.toString() ?? "";
  const imageUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1001)}/500/1000`;

  const campaignData = {
    about: formData.get("about")?.toString() ?? "",
    title: formData.get("title")?.toString() ?? "",
    imageUrl: formData.get("imageIrl")?.toString() ?? imageUrl,
    walletAddress: formData.get("walletAddress")?.toString() ?? "",
    amount: Number(formData.get("amount")) ?? 0,
  };

  const { userId } = auth();

  if (!userId) {
    response.message = "Please sign-in first";
    response.success = false;
    return response;
  }

  const campaign = await db.campaign.upsert({
    where: {
      id: id,
    },
    update: campaignData,
    create: {
      ...{ user: { connect: { userId: userId } } },
      ...campaignData,
    },
  });

  return { ...response, ...{ data: campaign } };
}

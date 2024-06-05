/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use server";

import { clerkClient } from "@clerk/clerk-sdk-node";
import { auth } from "@clerk/nextjs/server";
import { db } from "$/src/server/db";
import { type Response } from "$/src/utils/types";

export async function updateProfile(previousState: any, formData: FormData) {
  const response: Response = {
    success: true,
    message: "Profile Successfully Updated",
    data: {},
  };

  const imageUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1001)}/500/1000`;

  const profileData = {
    about: formData.get("about")?.toString(),
    firstName: formData.get("firstName")?.toString(),
    email: formData.get("email")?.toString(),
    instagram: formData.get("instagram")?.toString(),
    twitter: formData.get("twitter")?.toString(),
    linkedin: formData.get("linkedin")?.toString(),
    imageUrl: formData.get("imageUrl")?.toString() ?? imageUrl,
  };

  const { userId } = auth();

  if (!userId) {
    response.message = "Please sign-in first";
    response.success = false;
    return response;
  }

  await db.user.upsert({
    where: {
      userId: userId,
    },
    update: profileData,
    create: {
      userId: userId,
      firstName: profileData.firstName ?? "",
      email: profileData.email ?? "",
      about: profileData.about ?? "",
      instagram: profileData.instagram ?? "",
      twitter: profileData.twitter ?? "",
      linkedin: profileData.linkedin ?? "",
    },
  });

  const user = await db.user.update({
    where: {
      userId: userId,
    },
    data: profileData,
  });

  // also update the clerk metadata
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      details: profileData,
    },
  });

  return { ...response, ...{ data: user } };
}

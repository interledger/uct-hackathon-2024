import {
  clerkMiddleware,
  createRouteMatcher,
  currentUser,
} from "@clerk/nextjs/server";
import { db } from "$/src/server/db";

const isSignIn = createRouteMatcher(["/sign-in", "/sign-up"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/creators",
  "/profile/(.+)",
  "/campaign/(.+)",
  "/(api|trpc)(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  } else if (isSignIn(request)) {
    if (!auth().userId) {
      return;
    }

    const userCount = await db.user.count({
      where: { userId: auth().userId! },
    });

    if (userCount !== 0) {
      return;
    }

    const user = await currentUser();

    if (!user) {
      return;
    }

    await db.user.create({
      data: {
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        firstName: user.firstName ?? "",
        imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 1001)}/500/1000`,
      },
    });
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

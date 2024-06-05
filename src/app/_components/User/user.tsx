/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Link,
} from "@nextui-org/react";
import { type User } from "@prisma/client";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function UserCard({ user }: { user: User }) {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={user.imageUrl ?? ""}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user.firstName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {user.email}
            </h5>
          </div>
        </div>
        <Button
          as={Link}
          href={`/profile/${user.userId}`}
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
        >
          Profile
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{user.about}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="mt-4 flex items-center space-x-4 ">
          <Link
            isExternal
            href={user?.twitter ?? "#"}
            aria-label="Twitter"
            isDisabled={user?.twitter ? false : true}
          >
            <FaTwitter className="text-default-900" />
          </Link>

          <Link
            isExternal
            href={user?.linkedin ?? "#"}
            aria-label="LinkedIn"
            isDisabled={user?.linkedin ? false : true}
          >
            <FaLinkedin className="text-default-900" />
          </Link>

          <Link
            isExternal
            href={user?.instagram ?? "#"}
            aria-label="Instagram"
            isDisabled={user?.instagram ? false : true}
          >
            <FaInstagram className="text-default-900" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

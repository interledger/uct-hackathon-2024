/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Container from "../_components/Container/container";
import {
  Button,
  CardBody,
  Input,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { Card } from "@nextui-org/react";
import React from "react";
import { useFormState } from "react-dom";
import { api } from "$/src/trpc/react";
import UserCard from "../_components/User/user";

export default function Campaign({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const campaign = api.campaigns.getOne.useQuery({
    id: params.id ?? "",
  });

  const users = api.users.get.useQuery({});

  return (
    <Container className="flex flex-col items-center">
      {users.data && (
        <div className="grid w-full grid-cols-1 gap-2 overflow-scroll p-4 md:grid-cols-3 xl:grid-cols-4">
          {users.data.data.map((user) => (
            <UserCard key={user.id} user={user}></UserCard>
          ))}
        </div>
      )}
    </Container>
  );
}

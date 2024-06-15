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
        <div className="grid grid-cols-2 gap-4 w-full p-4">
    <div className="aspect-square rounded-md bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer shadow-lg" onClick={() => alert('Box 1 clicked!')}>
        <div className="px-5">
      <div className="text-base">
        <p className="text-3xl">Individual Support</p>
        <p>Help someone in their time of need by contributing to their campaign,</p>
        <p>you can offer immediate assistance and make a difference in someones lives.</p>
        <p>Your donations help fund essential services, from disaster relief and healthcare to education and social services. Changing someones life one donation at a time.</p>
      </div>
    </div> 
    </div>
    <a href="profile">
    <div className="aspect-square rounded-md bg-green-500 hover:bg-green-700 text-white flex items-center justify-center cursor-pointer shadow-lg" onClick={() => alert('Box 2 clicked!')}>
        <div className="px-5">
      <div className="text-base">
        <p className="text-3xl">Non-governmental organization (NGOs)</p>
        <p>Non-Governmental Organizations (NGOs) and Non-Profit Organizations (NPOs) play a crucial role in driving social change by addressing various global issues,including poverty, education, healthcare, and environmental conservation.</p>
        <p>By supporting NGOs and NPOs, individuals can enable significant change by donating resources, volunteering their time, and raising awareness about their causes.</p>
         </div>
      </div> 
    </div>
    </a>
  </div>
    </Container>
  );
}

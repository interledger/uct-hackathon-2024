/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Container from "../../_components/Container/container";
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
import { donateToCampaign } from "$/src/server/actions/campaign";
import { api } from "$/src/trpc/react";

export default function Campaign({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const campaign = api.campaigns.getOne.useQuery({
    id: params.id ?? "",
  });

  const [donationSentState, donateToCampaignAction] = useFormState(
    donateToCampaign,
    null,
  );

  return (
    <Container className="flex flex-col items-center">
      <Card isBlurred className="w-9/12 border-none" shadow="sm">
        <CardBody>
          <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
            <div className=" col-span-6 md:col-span-4">
              <Image
                alt="Campaign image"
                className="h-96 object-cover"
                shadow="md"
                src={campaign.data?.imageUrl ? campaign.data.imageUrl : ""}
                width="100%"
              />
            </div>

            <div className="col-span-6 flex flex-col md:col-span-8">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0">
                  <h1 className="font-semibold text-foreground/90">
                    {campaign.data?.title}
                  </h1>
                  <h3 className="text-foreground/80">
                    R {campaign.data?.amount}
                  </h3>
                  <p className="text-md mt-2 ">{campaign.data?.about}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-4">
                <Input
                  name="walletAddress"
                  className="text-sm"
                  label="wallet address"
                  placeholder="Open payment address to donate to"
                  value={campaign.data?.walletAddress}
                  disabled
                />
                <Input
                  name="amount"
                  type="number"
                  className="text-sm"
                  startContent="ZAR"
                  label="amount"
                  placeholder="Amount being raised"
                  required
                />
              </div>

              <div className="flex w-full items-center justify-center p-4">
                <Button
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="solid"
                  color="primary"
                >
                  Donate
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}

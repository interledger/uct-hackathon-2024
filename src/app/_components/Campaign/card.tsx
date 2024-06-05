/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { type Campaign } from "@prisma/client";
import { FaCreditCard } from "react-icons/fa";
import { createCampaign } from "$/src/server/actions/campaign";
import { useFormState } from "react-dom";
import { useUser } from "@clerk/nextjs";
import { api } from "$/src/trpc/react";

export default function CampaignCard({
  campaign,
  refreshCampaigns,
}: {
  campaign: Campaign;
  refreshCampaigns: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUser();

  const [campaignCreatedState, createCampaignAction] = useFormState(
    createCampaign,
    null,
  );

  useEffect(() => {
    refreshCampaigns();
  }, [campaignCreatedState, refreshCampaigns]);

  const isCampaignOwner = campaign.userId === user?.id;

  function onClose() {
    console.log("Error fetching campaigns");
  }

  const deleteCampaignMutation = api.campaigns.deleteCampaign.useMutation();

  async function deleteCampaign(id: string) {
    await deleteCampaignMutation.mutateAsync({
      id: id,
    });
    refreshCampaigns();
  }

  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={campaign.imageUrl ? campaign.imageUrl : ""}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {campaign.title}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              R {campaign.amount}
            </h5>
          </div>
        </div>
        <Button
          as={Link}
          href={`/campaign/${campaign.id}`}
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
          isExternal
        >
          Donate
        </Button>
      </CardHeader>
      <CardBody className="space-y-3 px-3 text-small ">
        <span className="flex flex-row items-center gap-2 pt-2 font-bold">
          <FaCreditCard />
          {campaign.walletAddress}
        </span>
        <p>{campaign.about}</p>
      </CardBody>
      <CardFooter>
        {isCampaignOwner && (
          <div className="space-x-4">
            <Button
              color="primary"
              radius="full"
              size="sm"
              variant={"solid"}
              onPress={onOpen}
            >
              Edit
            </Button>
            <Button
              color="primary"
              radius="full"
              size="sm"
              variant={"solid"}
              onPress={() => deleteCampaign(campaign.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        onClose={onClose}
      >
        <ModalContent>
          <form action={createCampaignAction}>
            <ModalHeader className="flex flex-col gap-1">
              Edit Campaign
            </ModalHeader>
            <ModalBody>
              <Input
                className="hidden"
                name="id"
                label="id"
                value={campaign.id}
              />
              <Input
                name="title"
                label="title"
                placeholder="Enter your campaign title"
                defaultValue={campaign.title}
                required
              />
              <Input
                name="walletAddress"
                className="text-sm"
                label="wallet address"
                placeholder="Open payment address to donate to"
                defaultValue={campaign.walletAddress}
                required
              />
              <Textarea
                name="about"
                label="About"
                placeholder="Tell us about your campaign!"
                defaultValue={campaign.about}
                className="w-full"
                required
              />
              <Input
                name="amount"
                type="number"
                className="text-sm"
                startContent="ZAR"
                label="amount"
                placeholder="Amount being raised"
                defaultValue={campaign.amount.toString()}
                required
              />
              {campaignCreatedState?.success === false && (
                <Card className="flex w-full flex-col items-center bg-danger-100 p-2">
                  Failed to edit campaign: {campaignCreatedState.message}
                </Card>
              )}
              {campaignCreatedState?.success === true && (
                <Card className="flex w-full flex-col items-center bg-success-100 p-2">
                  {campaignCreatedState.message}
                </Card>
              )}
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Edit</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Card>
  );
}

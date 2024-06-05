"use client";

import Container from "../../_components/Container/container";
import {
  Button,
  Input,
  Textarea,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { type UserDetail } from "$/src/utils/types";
import { Card, Link } from "@nextui-org/react";
import {
  FaInstagram,
  FaLinkedin,
  FaPen,
  FaPlus,
  FaTimes,
  FaTwitter,
} from "react-icons/fa";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { updateProfile } from "$/src/server/actions/profile";
import { createCampaign } from "$/src/server/actions/campaign";
import { ToastContainer, toast } from "react-toastify";
import { api } from "$/src/trpc/react";
import CampaignCard from "../../_components/Campaign/card";

export default function Profile({ params }: { params: { id: string } }) {
  const { user: clerkUser } = useUser();
  const [edit, setEdit] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userId = params.id ? params.id[0] : undefined;

  const campaigns = api.campaigns.get.useQuery({
    userId: userId ?? clerkUser?.id,
  });

  const isProfileOwner = !userId || clerkUser?.id === userId;

  const fetchUser = api.users.getOne.useQuery({
    userId: userId ?? clerkUser?.id ?? "",
  });

  const userDetail = fetchUser.data as UserDetail;

  const [campaignCreatedState, createCampaignAction] = useFormState(
    createCampaign,
    null,
  );

  const [profileUpdatedState, profileUpdatedAction] = useFormState(
    updateProfile,
    null,
  );

  useEffect(() => {
    campaigns.refetch().catch(() => {
      console.log("Error fetching campaigns");
    });
  }, [campaignCreatedState, campaigns]);

  function refreshCampaigns() {
    campaigns.refetch().catch(() => {
      console.log("Error fetching campaigns");
    });
  }
  return (
    <Container>
      <div className="flex h-screen flex-col gap-4  md:flex-row">
        <Card className="flex h-[80%] w-full flex-col items-center overflow-visible p-4 md:w-4/12">
          {isProfileOwner && (
            <Button
              isIconOnly
              className="variant-filled absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 rounded-full"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              {!edit && <FaPen />}
              {edit && <FaTimes />}
            </Button>
          )}

          <User
            name={userDetail?.firstName}
            description={userDetail?.email}
            avatarProps={{
              src: userDetail?.imageUrl,
              size: "lg",
              isBordered: true,
            }}
          />
          {!edit && (
            <div className="flex  flex-col items-center p-4">
              <div className="mt-4 flex items-center space-x-4 ">
                <Link
                  isExternal
                  href={userDetail?.twitter ?? "#"}
                  aria-label="Twitter"
                  isDisabled={userDetail?.twitter ? false : true}
                >
                  <FaTwitter className="text-default-900" />
                </Link>

                <Link
                  isExternal
                  href={userDetail?.linkedin ?? "#"}
                  aria-label="LinkedIn"
                  isDisabled={userDetail?.linkedin ? false : true}
                >
                  <FaLinkedin className="text-default-900" />
                </Link>

                <Link
                  isExternal
                  href={userDetail?.instagram ?? "#"}
                  aria-label="Instagram"
                  isDisabled={userDetail?.instagram ? false : true}
                >
                  <FaInstagram className="text-default-900" />
                </Link>
              </div>

              <div className="m-2 md:m-12">{userDetail?.about}</div>
            </div>
          )}

          {edit && (
            <form
              action={profileUpdatedAction}
              className="w-full space-y-4 pt-4"
            >
              <Textarea
                name="about"
                label="About"
                placeholder="Tell us what you're about!"
                className="w-full"
                defaultValue={userDetail?.about}
              />
              <Input
                name="firstName"
                label="Name"
                className="hidden w-full"
                value={clerkUser?.firstName ?? ""}
              />
              <Input
                name="email"
                label="Email"
                className="hidden w-full"
                value={clerkUser?.primaryEmailAddress?.emailAddress}
              />
              <Input
                name="instagram"
                type="url"
                label="Instagram"
                placeholder="e.g. https://www.instagram.com/axoneuniverse"
                isInvalid={false}
                errorMessage="Please enter a valid url"
                className="w-full"
                defaultValue={userDetail?.instagram}
              />
              <Input
                name="twitter"
                type="url"
                label="Twitter"
                placeholder="e.g. https://x.com/axone_universe"
                isInvalid={false}
                errorMessage="Please enter a valid url"
                className="w-full"
                defaultValue={userDetail?.twitter}
              />
              <Input
                name="linkedin"
                type="url"
                label="LinkedIn"
                placeholder="e.g. https://www.linkedin.com/company/axone-universe"
                isInvalid={false}
                errorMessage="Please enter a valid url"
                className="w-full"
                defaultValue={userDetail?.linkedin}
              />
              {profileUpdatedState?.success === false && (
                <Card className="flex w-full flex-col items-center bg-danger-100 p-2">
                  Failed to create campaign: {profileUpdatedState.message}
                </Card>
              )}
              {profileUpdatedState?.success === true && (
                <Card className="flex w-full flex-col items-center bg-success-100 p-2">
                  {profileUpdatedState.message}
                </Card>
              )}
              <Button type="submit">Save</Button>
            </form>
          )}
        </Card>
        <Card className="h-[80%] w-full overflow-visible p-2 md:w-8/12">
          {isProfileOwner && (
            <Button
              isIconOnly
              className="variant-filled absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 rounded-full"
              onPress={onOpen}
            >
              <FaPlus />
            </Button>
          )}
          <h3 className="mx-4 font-bold">Campaigns</h3>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              <form action={createCampaignAction}>
                <ModalHeader className="flex flex-col gap-1">
                  New Campaign
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="title"
                    label="title"
                    placeholder="Enter your campaign title"
                    required
                  />
                  <Input
                    name="walletAddress"
                    className="text-sm"
                    label="wallet address"
                    placeholder="Open payment address to donate to"
                    required
                  />
                  <Textarea
                    name="about"
                    label="About"
                    placeholder="Tell us about your campaign!"
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
                    required
                  />
                  {campaignCreatedState?.success === false && (
                    <Card className="flex w-full flex-col items-center bg-danger-100 p-2">
                      Failed to create campaign: {campaignCreatedState.message}
                    </Card>
                  )}
                  {campaignCreatedState?.success === true && (
                    <Card className="flex w-full flex-col items-center bg-success-100 p-2">
                      {campaignCreatedState.message}
                    </Card>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button type="submit">Create</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
          {campaigns.data && (
            <div className="grid w-full grid-cols-1 gap-4 overflow-scroll p-4 md:grid-cols-2 xl:grid-cols-3">
              {campaigns.data.data.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  refreshCampaigns={refreshCampaigns}
                ></CampaignCard>
              ))}
            </div>
          )}
        </Card>
        <ToastContainer />
      </div>
    </Container>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Container from "../../_components/Container/container";
import {
  Button,
  CardBody,
  Input,
  Image,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  Link,
} from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { api } from "$/src/trpc/react";
import {
  FaCheck,
  FaCreditCard,
  FaDatabase,
  FaLock,
  FaMoneyBill,
  FaSpinner,
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function Campaign({ params }: { params: { id: string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpOpen,
    onOpen: onOpOpen,
    onOpenChange: onOpOpenChange,
  } = useDisclosure();
  const [step, setStep] = useState(0);
  const [donation, setDonation] = React.useState("");
  const [senderWalletAddress, setWalletAddress] = React.useState("");
  const [refetchIncomePayment, setRefetchIncomePayment] = React.useState(false);
  const [refetchQoute, setRefetchQoute] = React.useState(false);
  const [opAuth, setOpAuth] = React.useState({
    walletAddress: "",
    continueAccessToken: "",
    continueUri: "",
    quoteId: "",
    interactRef: "",
  });

  const searchParams = useSearchParams();

  const campaign = api.campaigns.getOne.useQuery({
    id: params.id ?? "",
  });

  const receiverWalletDetails = api.openPayments.getWalletDetails.useQuery(
    {
      walletAddress: campaign.data?.walletAddress ?? "",
    },
    { enabled: false },
  );

  const senderWalletDetails = api.openPayments.getWalletDetails.useQuery(
    {
      walletAddress: senderWalletAddress ?? "",
    },
    { enabled: false },
  );

  const incomingPayment = api.openPayments.createIncomingPayment.useQuery(
    {
      walletAddress: senderWalletAddress,
      receiverAddress: campaign.data?.walletAddress ?? "",
      value: donation,
    },
    { enabled: false },
  );

  const qoute = api.openPayments.createQoute.useQuery(
    {
      walletAddress: senderWalletAddress,
      incomingPaymentUrl: incomingPayment.data?.data.id ?? "",
    },
    { enabled: false },
  );

  const outgoingPaymentAuthorization =
    api.openPayments.getOutgoingPaymentAuthorization.useQuery(
      {
        walletAddress: senderWalletAddress,
        qouteId: qoute.data?.data.id ?? "",
        redirectUrl: window.location.href,
        debitAmount: qoute.data?.data.debitAmount,
        receiveAmount: qoute.data?.data.receiveAmount,
      },
      { enabled: false },
    );

  const createOutgoingPayment = api.openPayments.createOutgoingPayment.useQuery(
    {
      walletAddress: opAuth.walletAddress,
      qouteId: opAuth.quoteId,
      interactRef: opAuth.interactRef,
      continueAccessToken: opAuth.continueAccessToken,
      continueUri: opAuth.continueUri,
    },
    { enabled: false },
  );

  // Whenever wallet address or donation changes
  useEffect(() => {
    senderWalletDetails.refetch().catch(() => {
      console.log("Error fetching sender wallet address details");
    });
  }, [senderWalletAddress]);

  useEffect(() => {
    setRefetchIncomePayment(true);
    setRefetchQoute(true);
  }, [senderWalletAddress, donation]);

  // Just after mounting check if there is an op-auth
  useEffect(() => {
    const interactRef = searchParams.get("interact_ref");
    const continueAccessToken = localStorage.getItem("continueAccessToken");
    const continueUri = localStorage.getItem("continueUri");
    const walletAddress = localStorage.getItem("walletAddress");
    const qouteId = localStorage.getItem("qouteId");

    if (
      interactRef &&
      continueAccessToken &&
      continueUri &&
      walletAddress &&
      qouteId
    ) {
      setOpAuth({
        walletAddress: walletAddress,
        continueAccessToken: continueAccessToken,
        continueUri: continueUri,
        quoteId: qouteId,
        interactRef: interactRef,
      });
    }
  }, []);

  useEffect(() => {
    if (opAuth.interactRef) {
      createOutgoingPayment.refetch().catch(() => {
        console.log("Error creating outgoing payment");
      });
      onOpOpen();
    }
  }, [opAuth]);

  // Types
  type paymentStep = {
    step: number;
    name: string;
    next: string;
    action: () => void;
  };

  type OPAuth = {
    walletAddress: string;
    continueAccessToken: string;
    quoteId: string;
    interactRef: string;
  };

  const steps: paymentStep[] = [
    {
      step: 0,
      name: "Receiver Wallet Address Details",
      next: "Create Incoming Payment Resource",
      action: () => {
        if (!receiverWalletDetails.isFetched) {
          receiverWalletDetails.refetch().catch(() => {
            console.log("Error fetching receiver wallet address details");
          });
        }
      },
    },
    {
      step: 1,
      name: "Create Income Payment",
      next: "Create Qoute",
      action: () => {
        if (!incomingPayment.isFetched || refetchIncomePayment) {
          incomingPayment
            .refetch()
            .then(() => {
              setRefetchIncomePayment(false);
            })
            .catch(() => {
              console.log("Error creating incoming payment");
            });
        }
      },
    },
    {
      step: 2,
      name: "Create Qoute",
      next: "Create Outgoing Payment",
      action: () => {
        if (!qoute.isFetched || refetchQoute) {
          qoute
            .refetch()
            .then(() => {
              setRefetchQoute(false);
            })
            .catch(() => {
              console.log("Error creating qoute");
            });
        }
      },
    },
    {
      step: 3,
      name: "Authorize Outgoing Payment",
      next: "Create Outgoing Payment",
      action: () => {
        outgoingPaymentAuthorization
          .refetch()
          .then((res) => {
            localStorage.setItem(
              "continueAccessToken",
              res.data?.data.continue.access_token.value ?? "",
            );
            localStorage.setItem("walletAddress", senderWalletAddress);
            localStorage.setItem("qouteId", qoute.data?.data.id ?? "");
            localStorage.setItem(
              "continueUri",
              res.data?.data.continue.uri ?? "",
            );
          })
          .catch(() => {
            console.log("Error fetching authorization");
          });
      },
    },
  ];

  function submitDonation(event: { preventDefault: () => void }) {
    event.preventDefault();
    steps[step]?.action();
    onOpen();
  }

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

            <form
              onSubmit={submitDonation}
              className="col-span-6 flex flex-col md:col-span-8"
            >
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
                  label="Pay From"
                  placeholder="Enter Your Wallet Address"
                  value={senderWalletAddress}
                  onValueChange={setWalletAddress}
                  color="primary"
                  required
                />
                <Input
                  name="receiverAddress"
                  className="text-sm"
                  label="Pay To"
                  placeholder="Open payment address to donate to"
                  value={campaign.data?.walletAddress}
                  color="danger"
                  disabled
                />
                <Input
                  name="amount"
                  type="number"
                  className="text-sm"
                  startContent={senderWalletDetails.data?.data.assetCode}
                  label="amount"
                  placeholder="Amount being sent"
                  value={donation}
                  onValueChange={setDonation}
                  required
                />
              </div>

              <div className="flex w-full items-center justify-center p-4">
                <Button
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="solid"
                  color="primary"
                  type="submit"
                >
                  Donate
                </Button>
              </div>
            </form>
          </div>
          <Modal
            isOpen={isOpen}
            onClose={() => setStep(0)}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="3xl"
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                <h2>{steps[step]?.name}</h2>
              </ModalHeader>
              <ModalBody>
                {step === 0 && (
                  <div className="flex flex-col">
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaMoneyBill size={15} />
                        Currency
                      </Button>
                      <div className="col-span-2 text-medium">
                        {receiverWalletDetails.data?.data.assetCode}
                      </div>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaLock size={15} />
                        Auth Server
                      </Button>
                      <Snippet className="col-span-2" color="primary">
                        {receiverWalletDetails.data?.data.authServer}
                      </Snippet>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaDatabase size={15} />
                        Res Server
                      </Button>
                      <Snippet className="col-span-2" color="primary">
                        {receiverWalletDetails.data?.data.resourceServer}
                      </Snippet>
                    </span>
                  </div>
                )}
                {step === 1 && (
                  <div className="flex flex-col">
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaSpinner size={15} />
                        Completed
                      </Button>
                      <div className="col-span-2">
                        {String(incomingPayment.data?.data.completed)}
                      </div>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaCreditCard size={15} />
                        Payment Address
                      </Button>
                      <Snippet className="col-span-2" color="primary">
                        {incomingPayment.data?.data.walletAddress}
                      </Snippet>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaMoneyBill size={15} />
                        Incoming Amount
                        {" - " +
                          incomingPayment.data?.data.incomingAmount
                            ?.assetCode ?? ""}
                      </Button>
                      <div className="col-span-2">
                        {incomingPayment.data?.data.incomingAmount?.value}
                      </div>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaMoneyBill size={15} />
                        Received Amount{" "}
                        {" - " +
                          incomingPayment.data?.data.receivedAmount
                            ?.assetCode ?? ""}
                      </Button>
                      <div className="col-span-2">
                        {incomingPayment.data?.data.receivedAmount?.value}
                      </div>
                    </span>
                  </div>
                )}
                {step === 2 && (
                  <div className="flex flex-col">
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaCreditCard size={15} />
                        Sender Address
                      </Button>
                      <Snippet className="col-span-2" color="primary">
                        {qoute.data?.data.walletAddress}
                      </Snippet>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaLock size={15} />
                        IP URL
                      </Button>
                      <Snippet
                        className="col-span-2 overflow-hidden pr-20"
                        color="primary"
                      >
                        {qoute.data?.data.receiver}
                      </Snippet>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaMoneyBill size={15} />
                        Debit Amount{" "}
                        {" - " + qoute.data?.data.debitAmount?.assetCode ?? ""}
                      </Button>
                      <div className="col-span-2">
                        {qoute.data?.data.debitAmount?.value}
                      </div>
                    </span>
                    <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
                      <Button
                        className="col col-span-1 justify-start"
                        variant="light"
                      >
                        <FaMoneyBill size={15} />
                        Receive Amount{" "}
                        {" - " + qoute.data?.data.receiveAmount?.assetCode ??
                          ""}
                      </Button>
                      <div className="col-span-2">
                        {qoute.data?.data.receiveAmount?.value}
                      </div>
                    </span>
                  </div>
                )}
                {step === 3 && (
                  <div className="flex flex-col">
                    <span className="flex flex-col items-center pt-2 font-bold">
                      <Button
                        as={Link}
                        className="col col-span-1 justify-start"
                        variant="solid"
                        color="warning"
                        href={
                          outgoingPaymentAuthorization.data?.data.interact
                            ?.redirect
                        }
                      >
                        <FaLock size={15} />
                        Authorize Outgoing Payment
                      </Button>
                    </span>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex w-full flex-row justify-center">
                {step > 0 && (
                  <Button variant="flat" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                )}
                {step < steps.length - 1 && (
                  <Button
                    variant="flat"
                    onClick={() => {
                      steps[step + 1]?.action();
                      setStep(step + 1);
                    }}
                  >
                    {"Next -> " + steps[step]?.next}
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            onClose={() => {
              console.log("** closed");
            }}
            size="2xl"
            isOpen={isOpOpen}
            onOpenChange={onOpOpenChange}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Creating Outgoing Payment
              </ModalHeader>
              <ModalBody>
                {!createOutgoingPayment.isFetched && (
                  <span className="flex flex-col items-center pt-2 font-bold">
                    <Button
                      className="col col-span-1 justify-start"
                      variant="solid"
                      color="warning"
                      href={
                        outgoingPaymentAuthorization.data?.data.interact
                          ?.redirect
                      }
                    >
                      <FaSpinner size={15} />
                      Creating Outgoing Payment
                    </Button>
                  </span>
                )}
                {createOutgoingPayment.isFetched && (
                  <span className="flex flex-col items-center pt-2 font-bold">
                    <Button
                      className="col col-span-1 justify-start"
                      variant="solid"
                      color={
                        createOutgoingPayment.data
                          ? createOutgoingPayment.data.data.failed
                            ? "danger"
                            : "success"
                          : "danger"
                      }
                      href={
                        outgoingPaymentAuthorization.data?.data.interact
                          ?.redirect
                      }
                    >
                      <FaCheck size={15} />
                      {createOutgoingPayment.data
                        ? createOutgoingPayment.data.data.failed
                          ? "Outgoing Payment Failed"
                          : "Outgoing Payment Created! "
                        : "Outgoing Payment Failed"}
                    </Button>
                  </span>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>
    </Container>
  );
}

import { Button, Snippet } from "@nextui-org/react";
import { FaSpinner, FaCreditCard, FaMoneyBill } from "react-icons/fa";
import { type IncomingPaymentWithPaymentMethods } from "@interledger/open-payments";

export default function IncomingPaymentDetails({
  incomingPaymentDetails,
}: {
  incomingPaymentDetails?: IncomingPaymentWithPaymentMethods;
}) {
  return (
    <div className="flex flex-col">
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaSpinner size={15} />
          Completed
        </Button>
        <div className="col-span-2">
          {String(incomingPaymentDetails?.completed)}
        </div>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaCreditCard size={15} />
          Payment Address
        </Button>
        <Snippet className="col-span-2" color="primary">
          {incomingPaymentDetails?.walletAddress}
        </Snippet>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaMoneyBill size={15} />
          Incoming Amount
          {" - " + incomingPaymentDetails?.incomingAmount?.assetCode ?? ""}
        </Button>
        <div className="col-span-2">
          {incomingPaymentDetails?.incomingAmount?.value}
        </div>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaMoneyBill size={15} />
          Received Amount{" "}
          {" - " + incomingPaymentDetails?.receivedAmount?.assetCode ?? ""}
        </Button>
        <div className="col-span-2">
          {incomingPaymentDetails?.receivedAmount?.value}
        </div>
      </span>
    </div>
  );
}

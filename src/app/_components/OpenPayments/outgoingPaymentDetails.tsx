import { Button, Snippet } from "@nextui-org/react";
import { FaSpinner, FaCreditCard, FaMoneyBill, FaList } from "react-icons/fa";
import { type OutgoingPaymentWithSpentAmounts } from "@interledger/open-payments";

export default function OutgoingPaymentDetails({
  outgoingPaymentDetails,
}: {
  outgoingPaymentDetails?: OutgoingPaymentWithSpentAmounts;
}) {
  return (
    <div className="flex flex-col">
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button
          color={
            outgoingPaymentDetails
              ? outgoingPaymentDetails.failed
                ? "danger"
                : "success"
              : "success"
          }
          className="col col-span-1 justify-start"
          variant="light"
        >
          <FaSpinner size={15} />
          Processed
        </Button>
        <div className="col-span-2">
          {String(!outgoingPaymentDetails?.failed)}
        </div>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaList size={15} />
          Qoute ID
        </Button>
        <div className="col-span-2">
          {String(outgoingPaymentDetails?.quoteId)}
        </div>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaCreditCard size={15} />
          Payment Address
        </Button>
        <Snippet className="col-span-2" color="primary">
          {outgoingPaymentDetails?.walletAddress}
        </Snippet>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaMoneyBill size={15} />
          Debit Amount
          {" - " + outgoingPaymentDetails?.debitAmount?.assetCode ?? ""}
        </Button>
        <div className="col-span-2">
          {outgoingPaymentDetails?.debitAmount?.value}
        </div>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaMoneyBill size={15} />
          Received Amount{" "}
          {" - " + outgoingPaymentDetails?.receiveAmount?.assetCode ?? ""}
        </Button>
        <div className="col-span-2">
          {outgoingPaymentDetails?.receiveAmount?.value}
        </div>
      </span>
    </div>
  );
}

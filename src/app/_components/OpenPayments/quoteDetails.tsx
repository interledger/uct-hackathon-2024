import { Button, Snippet } from "@nextui-org/react";
import { FaCreditCard, FaLock, FaMoneyBill } from "react-icons/fa";
import { type Qoute } from "$/src/utils/types";

export default function QuoteDetails({
  qouteDetails,
}: {
  qouteDetails?: Qoute;
}) {
  return (
    <div className="flex flex-col">
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaCreditCard size={15} />
          Sender Address
        </Button>
        <Snippet className="col-span-2" color="primary">
          {qouteDetails?.walletAddress}
        </Snippet>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaLock size={15} />
          IP URL
        </Button>
        <Snippet className="col-span-2 overflow-hidden pr-20" color="primary">
          {qouteDetails?.receiver}
        </Snippet>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaMoneyBill size={15} />
          Debit Amount {" - " + qouteDetails?.debitAmount?.assetCode ?? ""}
        </Button>
        <div className="col-span-2">{qouteDetails?.debitAmount?.value}</div>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaMoneyBill size={15} />
          Receive Amount {" - " + qouteDetails?.receiveAmount?.assetCode ?? ""}
        </Button>
        <div className="col-span-2">{qouteDetails?.receiveAmount?.value}</div>
      </span>
    </div>
  );
}

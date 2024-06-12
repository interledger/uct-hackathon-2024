import { Button, Snippet } from "@nextui-org/react";
import { FaMoneyBill, FaLock, FaDatabase } from "react-icons/fa";
import { type WalletAddress } from "@interledger/open-payments";

export default function WalletAddressDetails({
  walletAddressDetails,
}: {
  walletAddressDetails?: WalletAddress;
}) {
  return (
    <div className="flex flex-col">
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaMoneyBill size={15} />
          Currency
        </Button>
        <div className="col-span-2 text-medium">
          {walletAddressDetails?.assetCode}
        </div>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaLock size={15} />
          Auth Server
        </Button>
        <Snippet className="col-span-2" color="primary">
          {walletAddressDetails?.authServer}
        </Snippet>
      </span>
      <span className="grid grid-cols-3 items-center gap-2 pt-2 font-bold">
        <Button className="col col-span-1 justify-start" variant="light">
          <FaDatabase size={15} />
          Res Server
        </Button>
        <Snippet className="col-span-2" color="primary">
          {walletAddressDetails?.resourceServer}
        </Snippet>
      </span>
    </div>
  );
}

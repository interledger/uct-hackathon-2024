export type Response = {
  message: string;
  success: boolean;
  data: unknown;
  cursor?: string | undefined;
};

export type UserDetail = {
  about?: string;
  email?: string;
  firstName?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  imageUrl?: string;
};

export type Qoute = {
  id: string;
  walletAddress: string;
  receiver: string;
  receiveAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  debitAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  method: "ilp";
  expiresAt?: string | undefined;
  createdAt: string;
};

export type OutgoingPayment = {
  id: string;
  walletAddress: string;
  quoteId?: string | undefined;
  failed?: boolean | undefined;
  receiver: string;
  receiveAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  debitAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  sentAmount: {
    value: string;
    assetCode: string;
    assetScale: number;
  };
  metadata?: object | undefined;
  createdAt: string;
  updatedAt: string;
};

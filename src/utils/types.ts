export type Response = {
  message: string;
  success: boolean;
  data: unknown;
  cursor?: string | undefined;
};

type Period = {
  start: Date;
  end: Date;
};

export type ListingSummary = {
  suburbName?: string;
  suburbId?: number;
  period?: Period;
  averageListingPrice?: number;
  averageSoldPrice?: number;
  averageListingTime?: number;
};

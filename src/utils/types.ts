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

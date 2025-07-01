type MetaData = {
  name: string;
  from: string;
  to: string;
};
type Chat = {
  id: string;
  message: string;
  sender: {
    is_kyc_verified: boolean;
    self: boolean;
    image: string;
  };
  time: string;
};

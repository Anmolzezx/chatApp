type MetaData = {
  name: string;
  from: string;
  to: string;
};
type Chat = {
  id: string;
  message: string;
  sender: {
    self: boolean;
    image: string;
  };
};

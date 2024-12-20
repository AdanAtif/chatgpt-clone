export type Message = {
    text: string;
    createdAt: Date;
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
  };
  
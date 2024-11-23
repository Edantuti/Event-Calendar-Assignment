export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
};

export type UserDataWithPassword = UserData & {
  password: string;
};

export type EventData = {
  id: string;
  description: string;
  title: string;
  dateTime: number;
  userId: string;
};

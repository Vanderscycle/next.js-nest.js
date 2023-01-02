export type UserInterface = {
  id?: number;
  name: string;
  username: string;
  password: string;
};

export interface UserState {
  users: UserInterface[]
  addUser: (payload: UserInterface) => void
}

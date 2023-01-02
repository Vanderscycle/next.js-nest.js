import create from 'zustand'
import {UserInterface, UserState } from "lib/interfaces"

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state:any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export const userStore = create<UserState>((set) => ({
  users: [],
  addUser: (payload: UserInterface) => {
    set((state:UserState)=>({
      users: [
        ...state.users,
        payload,
      ],
    }))
  }
}))

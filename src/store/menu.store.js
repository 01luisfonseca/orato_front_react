import { create } from "zustand";

export const useMenuStore = create((set) => ({
  open: false,

  setOpen: (state) => {
    set({ open: !!state });
  },

  openMenu: () => {
    set({ open: true });
  },

  closeMenu: () => {
    set({ open: false });
  },
}));

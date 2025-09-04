import { create } from "zustand";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ProfileService } from "@/services/profile.service";
import { getValidToken } from "@/config/auth";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  token: null,

  setUser: async (user) => {
    if (user) {
      const profile = new ProfileService(user.accessToken);
      user.profile = await profile.read();
    }
    set({ user, loading: false, token: user ? user.accessToken : null });
  },

  signUp: async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },

  signIn: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },

  signOut: async () => {
    await signOut(auth);
  },

  resetPassword: async (email) => {
    await sendPasswordResetEmail(auth, email);
  },

  setValidToken: async () =>
    set(async (state) => {
      const newToken = await getValidToken(state.user, state.token);
      if (newToken !== state.token) {
        return { ...state, token: newToken };
      }
      return state;
    }),

  updateProfile: async () =>
    set(async (state) => {
      const newState = Object.assign({}, state);
      if (state.user) {
        await state.setValidToken();
        const profile = new ProfileService(state.token);
        newState.user.profile = await profile.read();
      }
      return newState;
    }),
}));

import { create } from "zustand";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ProfileService } from "@/services/profile.service";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: async (user) => {
    if (user) {
      const profile = new ProfileService(user.accessToken);
      user.profile = await profile.read();
    }
    set({ user, loading: false });
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
}));

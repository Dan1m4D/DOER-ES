import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      username: null,
      email: null,
      profile_picture_url: null,
      isLoggedIn: false,
      success: null,

      login: (username, email, profile_picture_url) => {
        set(() => ({
          username: username,
          email: email,
          profile_picture_url: profile_picture_url,
          isLoggedIn: true,
        }));
      },
      setSuccess: (success) => {
        set(() => ({
          success: success,
        }));
      },
      logout: () =>
        set(() => ({
          username: null,
          email: null,
          profile_picture_url: null,
          isLoggedIn: false,
          success: null,
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used within ProfileProvider"
    );
  }

  return context;
};

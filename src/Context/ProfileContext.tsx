import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Profile } from "@/types/profile";
import { UserAuth } from "@/Context/Authcontext";
import { getProfile } from "@/services/profileService";

type ProfileContextType = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
};

const ProfileContext = createContext<
  ProfileContextType | undefined
>(undefined);

type ProfileProviderProps = {
  children: ReactNode;
};

export { ProfileContext };

export const ProfileProvider = ({
  children,
}: ProfileProviderProps) => {
  const { session, isLoading: authLoading } = UserAuth();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!session?.user?.id) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await getProfile(
      session.user.id
    );

    if (result.error) {
      setError(result.error);
      setProfile(null);
    } else {
      setProfile(result.data);
    }

    setIsLoading(false);
  }, [session?.user?.id]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    (async () => {
      await loadProfile();
    })();
  }, [authLoading, loadProfile]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        error,
        refreshProfile: loadProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
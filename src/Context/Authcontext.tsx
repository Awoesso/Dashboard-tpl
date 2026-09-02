import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimiting";
import { storeCSRFToken } from "@/lib/csrf";

interface AuthResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;

  signUpNewUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<AuthResponse>;

  signInUser: (
    email: string,
    password: string
  ) => Promise<AuthResponse>;

  signOut: () => Promise<void>;
};

const Authcontext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthcontextProviderProps = {
  children: ReactNode;
};

export const AuthcontextProvider = ({
  children,
}: AuthcontextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // =========================
  // SIGN UP
  // =========================

  const signUpNewUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<AuthResponse> => {
    try {
      const cleanEmail = email.trim();
      const cleanFirstName = firstName.trim();
      const cleanLastName = lastName.trim();

      // Rate limiting
      const rateLimitResult = rateLimit(
        `signup-${cleanEmail}`,
        3,
        60000
      );

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: `Too many signup attempts. Please try again in ${rateLimitResult.waitSeconds} seconds.`,
        };
      }

      // CSRF token
      storeCSRFToken();

      // Create Supabase account
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            first_name: cleanFirstName,
            last_name: cleanLastName,
          },
        },
      });

      // Supabase error
      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Signup error:", error);
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during signup.",
      };
    }
  };

  // =========================
  // SIGN IN
  // =========================

  const signInUser = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const cleanEmail = email.trim();

      // Rate limiting
      const rateLimitResult = rateLimit(
        `signin-${cleanEmail}`,
        5,
        60000
      );

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: `Too many login attempts. Please try again in ${rateLimitResult.waitSeconds} seconds.`,
        };
      }

      // CSRF token
      storeCSRFToken();

      // Login
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      // Supabase error
      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Signin error:", error);
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during signin.",
      };
    }
  };

  // =========================
  // SESSION
  // =========================

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(
            "Error fetching session:",
            error
          );
        }

        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // =========================
  // SIGN OUT
  // =========================

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setSession(null);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(
          "Error signing out:",
          error
        );
      }

      throw error;
    }
  };

  // =========================
  // PROVIDER
  // =========================

  return (
    <Authcontext.Provider
      value={{
        session,
        isLoading,
        signUpNewUser,
        signInUser,
        signOut,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

// =========================
// USER AUTH
// =========================

export const UserAuth = () => {
  const context = useContext(Authcontext);

  if (!context) {
    throw new Error(
      "UserAuth must be used within AuthcontextProvider"
    );
  }

  return context;
};
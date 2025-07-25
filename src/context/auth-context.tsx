import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type User, type Session } from "@supabase/supabase-js";
import { supabase } from "../supabase-client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signUp: (
    email: string,
    password: string,
    metadata?: Record<string, any>
  ) => Promise<AuthResponse>;
  signIn: (email: string, password?: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResponse>;
  updatePassword: (password: string) => Promise<AuthResponse>;
  updateUser: (attributes: UserAttributes) => Promise<AuthResponse>;
}

interface AuthResponse {
  data: any;
  error: string | null;
}

interface UserAttributes {
  email?: string;
  password?: string;
  data?: Record<string, any>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async (): Promise<void> => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    metadata: Record<string, any> = {}
  ): Promise<AuthResponse> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      setError(error.message);
      return { data: null, error: error.message };
    }
  };

  const signIn = async (
    email: string,
    password?: string
  ): Promise<AuthResponse> => {
    try {
      setError(null);
      if (!password) {
        const { data, error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        return { data, error: null };
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        return { data, error: null };
      }
    } catch (error: any) {
      setError(error.message);
      return { data: null, error: error.message };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };

  const resetPassword = async (email: string): Promise<AuthResponse> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      setError(error.message);
      return { data: null, error: error.message };
    }
  };

  const updatePassword = async (password: string): Promise<AuthResponse> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      setError(error.message);
      return { data: null, error: error.message };
    }
  };

  const updateUser = async (
    attributes: UserAttributes
  ): Promise<AuthResponse> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.updateUser(attributes);

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      setError(error.message);
      return { data: null, error: error.message };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types/profile";

export const getProfile = async (
  userId: string,
): Promise<{
  data: Profile | null;
  error: string | null;
}> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }


  return {
    data,
    error:null
  }
};

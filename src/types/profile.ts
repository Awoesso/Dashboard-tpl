export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  store_name?: string | null;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}
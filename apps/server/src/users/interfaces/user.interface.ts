export interface UserEntity {
  id: string;
  username: string;
  email: string;
  hpassword?: string | null;
  google_id?: string | null;
  is_admin: boolean;
  created_at: Date;
}

export type SafeUser = Omit<UserEntity, 'hpassword'>;

export interface JwtPayload {
  id: string;
  email: string;
  is_admin: boolean;
}

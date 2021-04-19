export type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
};

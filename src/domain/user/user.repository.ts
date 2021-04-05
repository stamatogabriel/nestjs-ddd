import { User } from './user';

export interface IUserRepository {
  Index(): Promise<User[]>;
  Create(createFields: User): Promise<User>;
  // UpdateById(userId: string, updateFields: Partial<User>): Promise<User>;
  // GetById(userId: string): Promise<User>;
}

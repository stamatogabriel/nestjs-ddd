import { User } from './user';

export interface IUserRepository {
  Index(): Promise<User[]>;
  Create(createFields: User): Promise<User>;
  UpdateById(userId: string, updateFields: Partial<User>): Promise<User>;
  FindById(userId: string): Promise<User>;
  FindByEmail(email: string): Promise<User>;
  FindByToken(token: string): Promise<User>;
  Destroy(userId: string): Promise<unknown>;
}

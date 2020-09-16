import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME: 'cookenu_users';

    public async createUser(
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
    ): Promise<void> {
        await this.getConnection()
        .insert({
            id,
            name,
            email,
            password,
            role
        })
        .into(UserDatabase.TABLE_NAME)
    }

    public async getUserByEmail(email: string): Promise<any> {
      const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({email})
      return result[0]
    }
  
    public async getUserById(id: string): Promise<any> {
      const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({id})
      return result[0]
    }
  
    public async getAllUsers(): Promise<any> {
      const result = await this.getConnection()
      .select('id', 'name', 'email', 'role' )
      .from(UserDatabase.TABLE_NAME)
      .where({role: 'NORMAL'})
      return result
    }
}
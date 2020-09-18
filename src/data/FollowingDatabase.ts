import { BaseDatabase } from "./BaseDatabase";


export default class FollowingDatabase extends BaseDatabase{
    private table: string = "following" 
    private static TABLE_RECIPES = 'recipes';
    private static TABLE_USERS = 'cookenu_users';
    
    async fallowUser(user_id: string, following_user_id: string){
        await this.getConnection()
        .insert({ user_id, following_user_id }).into(this.table);
    }

    async getFeedById(id: string): Promise<any> {
        const result = await this.getConnection().raw(`
        SELECT f.user_id, f.following_user_id, c.name, r.name, r.recipe_description, r.creation_date
        FROM ${this.table} as f
        JOIN ${FollowingDatabase.TABLE_RECIPES} as r
        ON f.following_user_id = r.creator_id
        JOIN ${FollowingDatabase.TABLE_USERS} c
        ON f.following_user_id = c.id
        WHERE f.user_id = "${id}"
        `);

        return result[0]
    }
    
    async deleteUserFollowing(id: string): Promise<void> {
        await this.getConnection()
        .delete()
        .from(this.table)
        .where({ user_id: id })
    }
}
import { BaseDatabase } from "./BaseDatabase";


export default class FollowingDatabase extends BaseDatabase{
    private table: string = "following" 
    private static TABLE_RECIPES = 'recipes';
    private static TABLE_USERS = 'cookenu_users';
    
    async fallowUser(id: string, user_id: string, following_user_id: string){
        try {
            await this.getConnection()
            .insert({ id, user_id, following_user_id }).into(this.table);

        } catch(err) {
            console.log(err.message)
        }
    }

    async getFollowingById(id: string): Promise<any> {
        const result = await this.getConnection()
        .select('following_user_id')
        .from(this.table)
        .where({id})

        return result[0]
    }

    async checkFollowingRelation(userId: string, followingUserId: string): Promise<any> {
        const result = await this.getConnection()
        .raw(`
            SELECT *
            FROM ${this.table}
            WHERE user_id = "${userId}"
            AND following_user_id = "${followingUserId}"
        `)
        return result[0][0]
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

    async deleteUserFollowing(userId: string, followingUserId: string): Promise<void> {
        await this.getConnection()
        .raw(`
            DELETE FROM ${this.table}
            WHERE user_id = "${userId}"
            AND following_user_id = "${followingUserId}"
        `)
        console.log("deleted")
    }

    async deleteAllUserFollowing(id: string): Promise<void> {
        await this.getConnection()
        .delete()
        .from(this.table)
        .where({ user_id: id })
    }
}
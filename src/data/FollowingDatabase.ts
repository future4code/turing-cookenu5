import { BaseDatabase } from "./BaseDatabase";


export default class FollowingDatabase extends BaseDatabase{
    private table: string = "following" 
    
    async fallowUser(user_id: string, following_user_id: string){
        await this.getConnection()
        .insert({ user_id, following_user_id }).into(this.table);
    }
    
    async deleteUserFollowing(id: string): Promise<void> {
        await this.getConnection()
        .delete()
        .from(this.table)
        .where({ user_id: id })
    }
}
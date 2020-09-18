import { BaseDatabase } from "./BaseDatabase";
import Knex from 'knex';

export  class RecipeDatabase extends BaseDatabase{
    private  table: string = "recipes"
    
    async createRecipe(id: string, name: string, recipe_description: string, creation_date: string){
        try{
            await this.getConnection().insert({id, name, recipe_description, creation_date}).into(this.table);

        }catch(error){
            throw new Error(error)

        }finally{
            BaseDatabase.destroyConnection();
        }
    }

    public async getRecipeById(id: string): Promise<any> {
        try {
            const result = await this.getConnection()
            .select('name', 'recipe_description', 'creation_date')
            .from(this.table)
            .where({id})
            return result[0]

        } catch(err) {
            console.log(err.message)
        }
    }

    async deleteRecipe(id: string): Promise<void> {
        await this.getConnection()
        .delete()
        .from(this.table)
        .where({ id })
    }
    
    async deleteAllUserRecipes(creatorId: string): Promise<void> {
        await this.getConnection()
        .delete()
        .from(this.table)
        .where({ creator_id: creatorId })
    }
}
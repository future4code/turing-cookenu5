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
}
import {Request, Response} from 'express'
import { RecipeDatabase } from '../data/RecipeDatabase';
import {UserDatabase} from '../data/UserDatabase'


export const createRecipe = async ( req: Request, resp: Response): Promise<any> =>{
    const userDb = new UserDatabase();
    const recipeDb = new RecipeDatabase();
    try{
        const user: any = await userDb.getUserByEmail(req.body.user_email);
        await recipeDb.createRecipe(user.id, req.body.name, req.body.recipe_description, req.body.creation_date);
        resp.status(200).send();
    }catch(error){
        resp.status(400).send(error);
    }
}
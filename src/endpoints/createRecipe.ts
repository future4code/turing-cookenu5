import {Request, Response} from 'express'
import { RecipeDatabase } from '../data/RecipeDatabase';
import {UserDatabase} from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';


export const createRecipe = async ( req: Request, resp: Response): Promise<any> =>{
    const userDb = new UserDatabase();
    const recipeDb = new RecipeDatabase();
    try{
        const recipeData = {
            name: req.body.name, 
            recipe_description: req.body.recipe_description, 
            creation_date: req.body.creation_date

        }
        const token = req.headers.authorization as string;

        const idGenerator = new IdGenerator();
        const recipeId = idGenerator.generateId();

        const authenticator = new Authenticator();
        const authenticatonData = authenticator.getData(token)

        await recipeDb.createRecipe(
            recipeId,
            recipeData.name,
            recipeData.recipe_description,
            new Date(recipeData.creation_date).toLocaleDateString('en-GB'),
            authenticatonData.id,
        );
        resp.status(200).send();
    }catch(error){
        resp.status(400).send(error);
    }
}
import {Request, Response} from 'express'
import { BaseDatabase } from '../data/BaseDatabase';
import { RecipeDatabase } from '../data/RecipeDatabase';
import {UserDatabase} from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';
import moment from 'moment';


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
            moment(recipeData.creation_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
            authenticatonData.id,
        );
        resp.status(200).send({
            message: "Recipe successfully created"
        });
    } catch(e){
        resp.status(400).send({
        message: e.message
        })  
      } finally {
        BaseDatabase.destroyConnection();
      }
}
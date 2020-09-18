import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Authenticator } from '../services/Authenticator';

export const getRecipe = async (req: Request, res: Response) => {

  try{

    const recipeData = {
      recipeId: req.params.recipeId,
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if(!authenticationData) {
        throw new Error('Unathorized operation')
    }

    const recipesDatabase = new RecipeDatabase();
    const recipe = await recipesDatabase.getRecipeById(recipeData.recipeId);

    res.status(200).send({
        recipe
    })

} catch(e){
    res.status(400).send({
    message: e.message
    })  
  } finally {
    BaseDatabase.destroyConnection();
  }
}
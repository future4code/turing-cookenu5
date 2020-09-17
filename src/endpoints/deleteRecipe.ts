import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import FollowingDatabase from '../data/FollowingDatabase';
import { Authenticator } from '../services/Authenticator';
import { RecipeDatabase } from '../data/RecipeDatabase';

export const deleteRecipe = async (req: Request, res: Response) => {

  try{

    const userData = {
      id: req.params.id,
      recipeId: req.params.recipeIdd,
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if(authenticationData.id !== userData.id) {
        throw new Error('Unathorized User')
    }

    const recipeDatabase = new RecipeDatabase();
    await recipeDatabase.deleteRecipe(userData.recipeId);

    res.status(200).send({
      message: 'Recipe deleted successfully'
    })

} catch(e){
    res.status(400).send({
    message: e.message
    })  
  } finally {
    BaseDatabase.destroyConnection();
  }
}
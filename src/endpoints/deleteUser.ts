import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import FollowingDatabase from '../data/FollowingDatabase';
import { Authenticator } from '../services/Authenticator';
import { RecipeDatabase } from '../data/RecipeDatabase';

export const deleteUser = async (req: Request, res: Response) => {

  try{

    const userData = {
      id: req.params.id,
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if(authenticationData.role !== 'ADMIN') {
        throw new Error('Unathorized User')
    }

    const recipeDatabase = new RecipeDatabase();
    await recipeDatabase.deleteAllUserRecipes(userData.id);

    const followingDatabase = new FollowingDatabase();
    await followingDatabase.deleteUserFollowing(userData.id);

    const userDatabase = new UserDatabase();
    await userDatabase.deleteUser(userData.id);

    res.status(200).send({
      message: 'User deleted successfully'
    })

} catch(e){
    res.status(400).send({
    message: e.message
    })  
  } finally {
    BaseDatabase.destroyConnection();
  }
}
import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import FollowingDatabase from '../data/FollowingDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';

export const unfollowUser = async (req: Request, res: Response) => {

  try{

    const userData = {
      id: req.params.id,
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if(!authenticationData) {
        throw new Error('Unathorized operation')
    }

    const followingDatabase = new FollowingDatabase();
    await followingDatabase.deleteUserFollowing(userData.id);

    res.status(200).send({
        message: "You are not following this user anymore"
    })

} catch(e){
    res.status(400).send({
    message: e.message
    })  
  } finally {
    BaseDatabase.destroyConnection();
  }
}
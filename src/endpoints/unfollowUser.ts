import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import FollowingDatabase from '../data/FollowingDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';

export const unfollowUser = async (req: Request, res: Response) => {

  try{

    const userData = {
        user_id: req.params.id,
        following_user_id: req.body.following_user_id,
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if(!authenticationData) {
        throw new Error('Unathorized operation')
    }

    const followingDatabase = new FollowingDatabase()
    
    const isFollowing = await followingDatabase.checkFollowingRelation(userData.user_id, userData.following_user_id)
    
    if(!isFollowing) {
        throw new Error ("You're not following this user")
    }

    await followingDatabase.deleteUserFollowing(userData.user_id, userData.following_user_id)

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
import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import FollowingDatabase from '../data/FollowingDatabase';
import { Authenticator } from '../services/Authenticator';

export const getFeed = async (req: Request, res: Response) => {

  try{

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if(!authenticationData) {
        throw new Error('Unathorized operation')
    }

    const followingDatabase = new FollowingDatabase();
    const following = await followingDatabase.getFeedById(authenticationData.id);

    res.status(200).send({
        following
    })

} catch(e){
    res.status(400).send({
    message: e.message
    })  
  } finally {
    BaseDatabase.destroyConnection();
  }
}
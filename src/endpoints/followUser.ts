import {Request, Response} from 'express';
import FollowingDatabase from '../data/FollowingDatabase'
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/IdGenerator';

export const fallowUser = async (req: Request, res: Response): Promise<any> =>{
    const db = new FollowingDatabase();
    if( req.body.following_user_id ){
        try{
            const followingData = {
              user_id: req.params.id,
              following_user_id: req.body.following_user_id,
            }

            const token = req.headers.authorization as string;
        
            const authenticator = new Authenticator();
            const aunthenticationData = authenticator.getData(token);

            if(followingData.user_id !== aunthenticationData.id) {
                throw new Error ("User not authorized")
            }

            if(followingData.user_id === followingData.following_user_id) {
                throw new Error ("You can't follow yourself, because it is weird. Go find some new friends")
            }

            // if(db.checkFollowingRelation(followingData.user_id, followingData.following_user_id)) {
            //     throw new Error ("You're already following this user. Did you forget?")
            // }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generateId();

            await db.fallowUser(id, followingData.user_id, followingData.following_user_id);

            res.status(200).send({
                message: "You are now following this user"
            });
        } catch(error){
            res.status(400).send(error);
        }
    }else{
        res.status(400).send("The atributes cannot be empty");
    }

}
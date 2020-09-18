import {Request, Response} from 'express';
import FollowingDatabase from '../data/FollowingDatabase'
import { Authenticator } from '../services/Authenticator';

export const fallowUser = async (req: Request, res: Response): Promise<any> =>{
    const db = new FollowingDatabase();
    if( req.params.following_user_id ){
        try{
            const token = req.headers.authorization as string;
        
            const authenticator = new Authenticator();
            const aunthenticationData = authenticator.getData(token);

            if(aunthenticationData.id === req.params.following_user_id) {
                throw new Error ("You can't follow yourself, because it is weird. Go find some new friends")
            }

            await db.fallowUser(aunthenticationData.id, req.params.following_user_id );

            res.status(200).send({
                message: "You are now following this user"
            });
        }catch(error){
            res.status(400).send(error);
        }
    }else{
        res.status(400).send("The atributes cannot be empty");
    }

}
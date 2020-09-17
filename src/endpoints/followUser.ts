import {Request, Response} from 'express';
import FollowingDatabase from '../data/FollowingDatabase'




export const fallowUser = async (req: Request, res: Response): Promise<any> =>{
    const db = new FollowingDatabase();
    if( req.body.user_id && req.body.following_user_id ){
        try{
            await db.fallowUser(req.body.user_id, req.body.following_user_id );
            res.status(200).send();
        }catch(error){
            res.status(400).send(error);
        }
    }else{
        res.status(400).send("The atributes cannot be empty");
    }

}
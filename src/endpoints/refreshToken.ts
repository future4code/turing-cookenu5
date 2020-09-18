import {Request, Response} from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { BaseDatabase } from '../data/BaseDatabase';

export const refreshToken = async ( req: Request, resp: Response): Promise<any> =>{
    try{
        const refreshToken = req.body.refreshToken;
        const device = req.body.device;

        const authenticator = new Authenticator();
        const refreshTokenData = authenticator.getData(refreshToken);

        if(refreshTokenData.device !== device) {
            throw new Error("Refresh token has no device")
        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(refreshTokenData.id);

        const accessToken = authenticator.generateToken({
            id: user.id,
            role: user.role
        })

        resp.status(200).send(accessToken);
    } catch(error){
        resp.status(400).send(error);
    } finally {
        BaseDatabase.destroyConnection();
    }
}
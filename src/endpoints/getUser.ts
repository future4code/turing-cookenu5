import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';

export const getUser = async (req: Request, res: Response) => {

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

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserById(userData.id);

    res.status(200).send({
      user
    })
} catch(e){
    res.status(400).send({
    message: e.message
    })  
  } finally {
    BaseDatabase.destroyConnection();
  }
}
import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';

export const getAllUsers = async (req: Request, res: Response) => {
  
  try {

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    if(authenticationData.role !== 'ADMIN') {
      throw new Error('Unathorized User')
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserById(authenticationData.id)

    if(!user) {
      throw new Error('User not found')
    }

    const students = await userDatabase.getAllUsers()
    res.status(200).send(students)

  } catch(e){
    res.status(400).send({
      message: e.message
    })
  }
}
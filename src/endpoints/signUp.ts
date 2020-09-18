import { Request, Response }  from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { RefreshTokenDatabase } from '../data/RefreshTokenDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      device: req.body.device
    }

    if(!userData.name || !userData.email || !userData.password || !userData.role) {
      throw new Error('Insert all required information')
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashedPassword = await hashManager.hash(userData.password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, userData.name, userData.email, hashedPassword, userData.role);

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({
      id, 
      role: userData.role
    }, "15s")

    const refreshToken = authenticator.generateToken({
      id,
      device: userData.device
    }, "2y")

    const refreshTokenDatabase = new RefreshTokenDatabase();
    await refreshTokenDatabase.createRefreshToken(refreshToken, userData.device, true, id);

    res.status(200).send({
      message: 'User created successfully',
      accessToken,
      refreshToken
    })

  } catch(e){
    res.status(400).send({
      message: e.message
    })
  } finally {
    BaseDatabase.destroyConnection();
  }
}
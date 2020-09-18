import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { RefreshTokenDatabase } from '../data/RefreshTokenDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';

export const login = async (req: Request, res: Response) => {

  try{

    const userData = {
      email: req.body.email,
      password: req.body.password,
      device: req.body.device
    }

    if(!userData.email || !userData.password) {
      throw new Error('Inser all required information')
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(userData.email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(userData.password, user.password);

    if(!isPasswordCorrect){
      throw new Error('Email or password incorrect')
    }

    const authenticator = new Authenticator();

    const accessToken = authenticator.generateToken({
      id: user.id,
      role: user.role
    }, process.env.ACCESS_TOKEN_EXPIRES_IN)

    const refreshToken = authenticator.generateToken({
      id: user.id,
      device: userData.device
    }, process.env.ACCESS_TOKEN_EXPIRES_IN)

    const refreshTokenDatabase = new RefreshTokenDatabase();
    const refreshTokenFromDatabase = await refreshTokenDatabase.getRefreshTokenByIdAndDevice(user.id, userData.device);

    if(refreshTokenFromDatabase) {
      await refreshTokenDatabase.deleteToken(refreshTokenFromDatabase.token)
    }

    await refreshTokenDatabase.createRefreshToken(refreshToken, userData.device, true, user.id)

    res.status(200).send({
      message: 'User successfully logged in',
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
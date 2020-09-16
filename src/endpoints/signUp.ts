import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';

export const signUp = async(req: Request, res: Response) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }

        if(!userData.name || !userData.email || !userData.password || !userData.role) {
            throw new Error('Insert all required information.')
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashedPassword = await hashManager.hash(userData.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id,
            userData.name,
            userData.email,
            hashedPassword,
            userData.role,
        )

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({
            id, 
            role: userData.role
        })

        res.status(200).send({
            message: "User created successfully.",
            token
        })
    }
    catch(err) {
        res.status(400).send({
            message: err.message
        })
    } finally {
        BaseDatabase.destroyConnection();
    }

}
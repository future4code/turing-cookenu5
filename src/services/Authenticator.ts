import * as jwt from 'jsonwebtoken';

export class Authenticator {
    public generateToken(data:AuthenticatonData): string {
        return jwt.sign(
            data,
            process.env.JWT_KEY as string,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        )
    }

    public getData(token: string): AuthenticatonData {
        const data = jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as any;
        return {
            id: data.id,
            role: data.role
        }
    }
}

export interface AuthenticatonData {
    id: string,
    role: USER_ROLES
}

export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

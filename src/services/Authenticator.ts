import * as jwt from 'jsonwebtoken';

export class Authenticator {
  public generateToken(data: AuthenticationData): string {
    return jwt.sign(
      data,
      process.env.JWT_KEY as string,
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
     )
  }

  public getData(token: string): AuthenticationData {
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


export interface AuthenticationData {
  id: string;
  role: USER_ROLES
}

export enum USER_ROLES {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL'
}
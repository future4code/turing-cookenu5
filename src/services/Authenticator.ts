import * as jwt from 'jsonwebtoken';

export class Authenticator {
  public generateToken(data: AuthenticationData, expiresIn: any = process.env.ACCESS_TOKEN_EXPIRES_IN): string {
    return jwt.sign(
      data,
      process.env.JWT_KEY as string,
      {expiresIn}
     )
  }

  public getData(token: string): AuthenticationData {
    const data = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any;
    return {
      id: data.id,
      role: data.role,
      device: data.device
    }
  }
}


export interface AuthenticationData {
  id: string;
  role?: USER_ROLES;
  device?: string
}

export enum USER_ROLES {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL'
}
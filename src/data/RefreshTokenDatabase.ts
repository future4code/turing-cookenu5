import { BaseDatabase } from "./BaseDatabase";

export class RefreshTokenDatabase extends BaseDatabase {
    private static TABLE_NAME = "refresh_token";

    convertBooleanToInt = (boolean: boolean): number => {
        if(boolean) {
            return 1
        } else {
            return 0
        }
    }

    convertIntToBoolean = (int: number): boolean => {
        if(int === 1) {
            return true
        } else {
            return false
        }
    }
    
    getOS = () => {
        let userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
      
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows';
        } else if (/Android/.test(userAgent)) {
          os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux';
        }
      
        return os;
    }

    public async createRefreshToken(
        token: string,
        device: string,
        isActive: boolean,
        userId: string,
    ): Promise<void> {
        await this.getConnection().insert(
            {
                refresh_token: token,
                device: device,
                is_active: this.convertBooleanToInt(isActive),
                user_id: userId
            })
            .into(RefreshTokenDatabase.TABLE_NAME)
    }

    public async getRefreshToken(token: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM ${RefreshTokenDatabase.TABLE_NAME}
            WHERE refresh_token = "${token}"
        `);
        const retrievedToken = result[0][0]
        return {
            token: retrievedToken.refresh_token,
            device: retrievedToken.device,
            isActive: this.convertIntToBoolean(retrievedToken.is_active),
            userId: retrievedToken.user_id
        }
    }

    public async getRefreshTokenByIdAndDevice(id: string, device: string): Promise<any>{
        const result = await this.getConnection().raw(`
            SELECT * FROM ${RefreshTokenDatabase.TABLE_NAME}
            WHERE user_id = "${id}"
            AND device = "${device}"
        `);

        const retrievedToken = result[0][0]

        if(retrievedToken === undefined) {
            return undefined
        }

        return {
            token: retrievedToken.refresh_token,
            device: retrievedToken.device,
            isActive: this.convertIntToBoolean(retrievedToken.is_active),
            userId: retrievedToken.user_id
        }
    }

    public async deleteToken(token: string): Promise<any> {
        await this.getConnection()
        .from(RefreshTokenDatabase.TABLE_NAME)
        .where({refresh_token: token})
        .del()
    }

}
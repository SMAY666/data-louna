import {JWTOptions} from './types';
import cryptoJS from 'crypto-js'

class JWT {
    // ----- [ PRIVATE METHODS ] ---------------------------------------------------------------------------------------

    private base64UrlEncode(data: string) {
        return Buffer.from(data)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public sign(payload: Record<any, any>, options: JWTOptions) {
        this.header = {alg: 'HS256', typ: 'JWT'};
        this.payload = {...payload, expiresIn: options.expiresIn};
        this.secret = options.secret;

        this.H = this.base64UrlEncode(JSON.stringify(this.header));
        this.P = this.base64UrlEncode(JSON.stringify(this.payload));

        const unsignedToken = this.H + '.' + this.P;
        this.S = cryptoJS.HmacSHA256(unsignedToken, this.secret).toString();

        return this.H + '.' + this.P + '.' + this.S;
    }

    // ----- [ PRIVATE MEMBERS ] ---------------------------------------------------------------------------------------

    private header: {alg: string, typ: 'JWT'} | undefined;
    private payload: Record<any, any> | undefined;
    private secret: string | undefined;

    private H: string | undefined;
    private P: string | undefined;
    private S: string | undefined;
}

export const jwt = new JWT();
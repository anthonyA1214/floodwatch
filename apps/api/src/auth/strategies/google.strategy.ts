import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions,VerifyCallback } from 'passport-google-oauth20';
import type { ConfigType } from '@nestjs/config';
import googleOathConfig from 'src/config/google-oath.config';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject(googleOathConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleOathConfig>,
    ) {
        super({
            clientID: googleConfiguration.clientId,          // fallback to empty string
            clientSecret: googleConfiguration.clientSecret,  // fallback to empty string
            callbackURL: googleConfiguration.callbackURL,    // fallback to empty string
            scope: ['email', 'profile'],
            passReqToCallback: false, // required to satisfy TypeScript
        } as StrategyOptions);
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        // Here you can map Google profile to your NestJS user entity
        console.log({ profile });
        return profile;
    }
}

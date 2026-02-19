import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import type { ConfigType } from '@nestjs/config';
import googleOauthConfig from 'src/common/config/google-oauth.config';
import { GoogleOAuthProfile } from 'src/common/types/google';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: { _json: GoogleOAuthProfile },
    done: VerifyCallback,
  ) {
    const google = profile._json;

    const user = {
      googleId: google.sub,
      email: google.email,
      firstName: google.given_name,
      lastName: google.family_name || google.given_name,
      profilePicture: google.picture,
    };

    done(null, user);
  }
}

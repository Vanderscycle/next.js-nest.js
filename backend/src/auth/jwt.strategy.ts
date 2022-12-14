import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    }); //config
  }
  async validate(payload: any) {
    //TODO:: create a user table
    // const user = await this.usersService.getById(payload.sub);
    console.log('test', this.configService.get<string>('JWT_SECRET'));
    return {
      id: payload.sub,
      name: payload.name, //...user
    };
  }
}

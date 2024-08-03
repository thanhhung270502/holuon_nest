import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/types';
import { Tokens } from 'src/types/tokens.type';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async getTokens(userId: string, role: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.AT_SECRET,
        expiresIn: '1m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.RT_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  verifyAccessToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.AT_SECRET });
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.RT_SECRET });
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

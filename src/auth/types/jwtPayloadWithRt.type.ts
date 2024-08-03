import { JwtPayload } from 'src/auth/types/jwt-payload.type';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };

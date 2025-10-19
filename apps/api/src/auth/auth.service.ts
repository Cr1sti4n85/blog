import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInInput } from './dto/signin.input';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.password)
      throw new UnauthorizedException('Invalid Credentials!');

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched)
      throw new UnauthorizedException('Invalid Credentials!');

    return user;
  }
}

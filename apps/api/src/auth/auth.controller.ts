import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

//this rest controller is in charge of oauth authentication
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: Request, @Res() response: Response) {
    //geberate access token
    if (!req.user) {
      throw new UnauthorizedException('Invalid user');
    }
    const userData = await this.authService.login(req.user as User);

    response.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verify() {
    return 'ok';
  }
}

// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}

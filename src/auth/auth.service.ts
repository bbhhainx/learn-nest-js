// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(email: string, password: string) {
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser(email, hashedPassword);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.userService.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.userService.findUserById(payload.sub);
    if (user.refreshToken !== refreshToken) throw new UnauthorizedException('Invalid refresh token');

    const newAccessToken = this.jwtService.sign({ email: user.email, sub: user.id, role: user.role }, { expiresIn: '15m' });
    return { accessToken: newAccessToken };
  }
}

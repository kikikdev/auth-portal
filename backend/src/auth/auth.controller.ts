import { Controller, Post, Body, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.register(username, password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Delete('delete/:uid')
  async softDeleteUser(@Param('uid') uid: string) {
    return this.authService.softDeleteUser(uid);
  }
}
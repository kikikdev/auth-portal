import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('home')
  async home() {
    return { message: 'Welcome to the home screen!' };
  }

  @Get('login')
  async login() {
    return { message: 'Please log in to access the home screen.' };
  }
}
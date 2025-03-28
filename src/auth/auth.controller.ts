import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  loginTest() {
    return 'login';
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return await this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('BODY IS ', body);
    return await this.authService.login(body.email, body.password);
  }
}

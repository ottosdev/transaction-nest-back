import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUp } from './dto/sign-up';
import { AuthService } from './auth.service';
import { SignIn } from './dto/sign-in';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() data: SignUp) {
    return this.authService.signup(data);
  }

  @Post('sign-in')
  async login(@Body() credentials: SignIn) {
    return this.authService.signIn(credentials);
  }
}

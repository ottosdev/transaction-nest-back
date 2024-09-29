import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUp } from './dto/sign-up';
import { CustomException } from '../error/exception-handler';
import * as bcrypt from 'bcrypt';
import { SignIn } from './dto/sign-in';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignUp) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new CustomException('User alread exists!', 400);
    }

    data.password = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data,
    });
  }

  async signIn(credentials: SignIn) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const passwordMath = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!passwordMath) {
      throw new UnauthorizedException('Wrong credentials');
    }

      const payload = { sub: user.id, name: user.name };
    return this.generateJwtToken(payload);
  }

  async generateJwtToken(payload: any) {
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }
}

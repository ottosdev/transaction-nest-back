import { IsEmail, IsString } from 'class-validator';

export class SignIn {
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  password: string;
}

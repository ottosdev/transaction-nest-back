import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUp {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;
}

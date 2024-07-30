import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  type: string;
  userId: string;
}

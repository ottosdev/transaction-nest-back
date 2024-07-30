import { IsNumber, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  type: string;
}

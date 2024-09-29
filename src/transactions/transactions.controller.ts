import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request: Request,
  ) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.transactionsService.findAll();
  }

  @Get('/summary')
  getSummary(@Req() request: Request) {
    return this.transactionsService.getSummary();
  }

  @Get('/:transactionId')
  findOne(
    @Param('transactionId') transactionId: string,
    @Req() request: Request,
  ) {
    return this.transactionsService.findOne(transactionId);
  }

  @Delete('/:transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('transactionId') transactionId: string,
    @Req() request: Request,
  ) {
    // const userId = request['user'].sub;

    await this.transactionsService.delete(transactionId);
  }

  @Put('/:transactionId')
  async update(
    @Param('transactionId') transactionId: string,
    @Body() data: UpdateTransactionDto,
    @Req() request: Request,
  ) {
    // const userId = request['user'].sub;
    return this.transactionsService.update(transactionId, data);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return this.transactionsService.create(createTransactionDto, userId);
  }

  @Get()
  findAll(@Req() request: Request) {
    const userId = request['user'].sub;
    return this.transactionsService.findAll(userId);
  }

  @Get('/summary')
  getSummary(@Req() request: Request) {
    const userId = request['user'].sub;
    return this.transactionsService.getSummary(userId);
  }

  @Get('/:transactionId')
  findOne(
    @Param('transactionId') transactionId: string,
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return this.transactionsService.findOne(transactionId, userId);
  }

  @Delete('/:transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('transactionId') transactionId: string,
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;

    await this.transactionsService.delete(transactionId, userId);
  }

  @Put('/:transactionId')
  async update(
    @Param('transactionId') transactionId: string,
    @Body() data: UpdateTransactionDto,
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return this.transactionsService.update(transactionId, userId, data);
  }
}

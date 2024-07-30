import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomException } from '../error/exception-handler';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransactionDto) {
    return this.prisma.transactions.create({
      data,
    });
  }

  async findAll(userId: string) {
    return this.prisma.transactions.findMany({
      where: {
        userId,
      },
    });
  }

  async getSummary(userId: string) {
    const transactions = await this.prisma.transactions.findMany({
      where: {
        userId,
      },
    });

    return transactions.reduce(
      (acc, transaction) => {
        const price = Number(transaction.price);

        if (transaction.type === 'entrada') {
          acc.entradas += price;
          acc.total += price;
        }
        if (transaction.type === 'saida') {
          acc.saidas += price;
          acc.total -= price;
        }

        return acc;
      },
      {
        total: 0,
        entradas: 0,
        saidas: 0,
      },
    );
  }

  async findOne(transactionId: string, userId: string) {
    return this.prisma.transactions.findFirst({
      where: {
        id: transactionId,
        userId: userId,
      },
    });
  }

  async update(
    transctionId: string,
    userId: string,
    data: UpdateTransactionDto,
  ) {
    const transaction = await this.findOne(transctionId, userId);

    if (!transaction) {
      throw new CustomException('Transaction not found', 404);
    }

    return this.prisma.transactions.update({
      where: {
        id: transctionId,
      },
      data,
    });
  }

  async delete(transactionId: string, userId: string) {
    const transaction = await this.findOne(transactionId, userId);

    if (!transaction) {
      throw new CustomException('Transaction not found', 404);
    }

    return this.prisma.transactions.delete({
      where: {
        id: transactionId,
      },
    });
  }
}

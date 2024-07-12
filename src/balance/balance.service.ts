import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from './balance.schema';
import { CreateBalanceDto } from './dto/create-balance.dto';

//decorador injectable permite essa class ser injetada em outro lugar
@Injectable()
//define class BalanceService
export class BalanceService {
  constructor(
    //o construtor injeta o balance.name e é armazenado no balanceModel de tipe BalanceDocument
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
  ) {}

  //consultar saldo
  async getBalance(userId: string): Promise<Balance> {
    return this.balanceModel.findOne({ userId }).exec();
  }

  //criar saldo novo, caso nao tenha o user id no banco ele cria um doc pra esse userid
  //ele não acumula saldo, caso rode um novo post o valor antigo será substituido
  async setBalance(createBalanceDto: CreateBalanceDto): Promise<Balance> {
    const { userId, amount } = createBalanceDto;
    const existingBalance = await this.balanceModel.findOne({ userId });

    if (existingBalance) {
      existingBalance.amount = amount;
      return existingBalance.save();
    }

    const newBalance = new this.balanceModel({ userId, amount });
    return newBalance.save();
  }

  async addBalance(createBalanceDto: CreateBalanceDto): Promise<Balance> {
    const { userId, amount } = createBalanceDto;
    const existingBalance = await this.balanceModel.findOne({ userId });

    if (existingBalance){
      existingBalance.amount += amount;
      return existingBalance.save();
    } else{
      throw new NotFoundException(`Não existe saldo cadastrado para esse user: ${userId}`);
    }

}
}

  

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { Balance, BalanceSchema } from './balance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Balance.name, schema: BalanceSchema }]),
  ],
  providers: [BalanceService],
  controllers: [BalanceController],
})
export class BalanceModule {}

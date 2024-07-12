import { Module } from '@nestjs/common';
import { BalanceModule } from './balance/balance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DespesasController } from './despesa/despesa.controller';
import { DespesasService } from './despesa/despesa.service';
import { DespesasModule } from './despesa/despesa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BalanceModule,
    DespesasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

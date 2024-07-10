import { Module } from '@nestjs/common';
import { BalanceModule } from './balance/balance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BalanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

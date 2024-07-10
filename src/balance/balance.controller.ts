import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':userId')
  async getBalance(@Param('userId') userId: string) {
    return this.balanceService.getBalance(userId);
  }

  @Post()
  async setBalance(@Body() createBalanceDto: CreateBalanceDto) {
    return this.balanceService.setBalance(createBalanceDto);
  }
}

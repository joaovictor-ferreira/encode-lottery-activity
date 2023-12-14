import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokensDto } from './dto/mintTokens.dto';
import { VotesDto } from './dto/votes.dto';
import { BuyTokensDTO } from './dto/buyTokens.dto';
import { BetDTO } from './dto/bet.dto';
import { WithdrawDTO } from './dto/withdraw.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('get-token-balance/:address')
  // getTokenBalance(@Param('address')address: string): Promise<bigint> {
  //   return this.appService.getTokenBalance(address);
  // }

  // @Post('mint-tokens')
  // mintTokens(@Body() body: MintTokensDto): Promise<any> {
  // return this.appService.mint(body.address, body.amount);
  // }

  // @Post('save-vote')
  // saveVote(@Body() body: VotesDto) {
  //   return this.appService.saveVote(body.address, body.proposal, body.amount);
  // }

  // @Get('get-all-votes')
  // getAllVotes(): Promise<any> {
  //   return this.appService.getAllVotes();
  // }

  @Get('check-state')
  checkState(): Promise<boolean> {
    return this.appService.checkState();
  }

  @Post('open-bets')
  openBets(): Promise<any> {
    return this.appService.openBets();
  }

  @Get('check-eth-balance')
  checkEthBalance(@Param('index') index: number): Promise<string> {
    return this.appService.checkEthBalance(index);
  }

  @Post('buy-tokens')
  buyTokens(@Body() body: BuyTokensDTO): Promise<any> {
    return this.appService.buyTokens(body.index, body.amount);
  }

  @Get('check-token-balance')
  checkTokenBalance(@Param('index') index: number): Promise<string> {
    return this.appService.checkTokenBalance(index);
  }

  @Post('bet')
  bet(@Body() body: BetDTO): Promise<any> {
    return this.appService.bet(body.index, body.times);
  }

  @Post('close-bets')
  async closeBetsEndpoint(): Promise<any> {
    try {
      const result = await this.appService.closeBets();
      return result;
    } catch (error) {
      // Handle the error here
      console.error('An error occurred in closeBetsEndpoint:', error);

      // Extract the "Already closed" part from the error message
      const errorMessage = error.message || '';
      const match = errorMessage.match(/"([^"]+)"/);
      const specificError = match ? match[1] : 'Unknown error';

      return { success: false, error: specificError };
    }
  }

  @Get('check-player-prize')
  checkPlayerPrize(@Param('index') index: number): Promise<bigint> {
    return this.appService.checkPlayerPrize(index);
  }

  @Post('claim-prize')
  claimPrize(@Param('index') index: number): Promise<any> {
    return this.appService.claimPrize(index);
  }

  @Post('withdraw')
  withdraw(@Body() body: WithdrawDTO): Promise<any> {
    return this.appService.withdraw(body.amount);
  }

  @Post('burn-tokens')
  burnTokens(@Body() body: BuyTokensDTO): Promise<any> {
    return this.appService.burnTokens(body.index, BigInt(body.amount));
  }
}

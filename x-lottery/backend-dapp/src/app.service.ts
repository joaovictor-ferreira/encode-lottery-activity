import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/artifacts.json';
import * as lotteryJson from './assets/lotteryArtifacts.json';
import * as lotteryTokenJson from './assets/lotteryTokenArtifacts.json';
import { Votes as VotesEntity } from './entity/votes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

const TOKEN_ADDRESS = '0x10a91764a9d6376c545d9be403c47a458a9c9e03';
const LOTTERY_ADDRESS = '0x9D1eA16f53C1E1cbf0ee346D2a57607aCd0810eb';
const LOTTERY_TOKEN_ADDRESS = '0x49fcE979dBB09Dabbee183F3D75676832D32182C';

@Injectable()
export class AppService {
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;
  lotteryContract: ethers.Contract;
  tokenLotteryContract: ethers.Contract;
  accounts: HardhatEthersSigner[];

  constructor(
    @InjectRepository(VotesEntity)
    private votesRepository: Repository<VotesEntity>,
  ) {
    this.provider = new ethers.JsonRpcProvider(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY ?? '',
      this.provider,
    );
    // this.accounts = ethers.Wallet.fromPhrase(process.env.MNEMONIC);
    this.contract = new ethers.Contract(
      TOKEN_ADDRESS,
      tokenJson.abi,
      this.wallet,
    );
    this.lotteryContract = new ethers.Contract(
      LOTTERY_ADDRESS,
      lotteryJson.abi,
      this.wallet,
    );
    this.tokenLotteryContract = new ethers.Contract(
      LOTTERY_TOKEN_ADDRESS,
      lotteryTokenJson.abi,
      this.wallet,
    );
  }

  getTokenAddress(): any {
    return { address: TOKEN_ADDRESS };
  }

  getTotalSupply(): Promise<bigint> {
    return this.contract.totalSupply();
  }

  getTokenBalance(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }

  async mint(address: string, amount: bigint): Promise<any> {
    const tx = await this.contract.mint(address, amount);
    const receipt = await tx.wait();
    return { success: true, txHash: receipt.hash };
  }

  saveVote(address: string, proposal: string, amount: string) {
    const newVote = this.votesRepository.create({ address, proposal, amount });
    return this.votesRepository.save(newVote);
  }

  getAllVotes(): Promise<VotesEntity[]> {
    return this.votesRepository.find();
  }

  //Lottery App
  checkState(): Promise<boolean> {
    return this.lotteryContract.betsOpen();
  }

  async openBets(): Promise<any> {
    try {
      const currentBlock = await this.provider.getBlock('latest');
      const timestamp = currentBlock?.timestamp ?? 0;

      const tx = await this.lotteryContract.openBets(timestamp + 1800);
      const receipt = await tx.wait();

      return { success: true, txHash: receipt.hash };
    } catch (error) {
      // Handle the error here
      console.error('An error occurred while opening bets:', error);

      // Extract the "Ownable: caller is not the owner" part from the error message
      const errorMessage = error.message || '';
      const match = errorMessage.match(/"([^"]+)"/);
      const specificError = match ? match[1] : 'Unknown error';

      return { success: false, error: specificError };
    }
  }

  async checkEthBalance(index: number): Promise<string> {
    console.log(this.accounts);
    //const address = this.accounts[index].address;
    const address = this.wallet.address;
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async buyTokens(index: number, amount: string): Promise<any> {
    //const address = this.accounts[index].address;
    const address = this.wallet.address;

    const tx = await this.lotteryContract.purchaseTokens({
      value: ethers.parseEther(amount),
    });
    await tx.wait();

    const ethBalance = await this.provider.getBalance(address);
    const eth = ethers.formatEther(ethBalance);

    const tokenBalance = await this.tokenLotteryContract.balanceOf(address);
    return { ethBalance: eth, tokensBalance: tokenBalance.toString() };
  }

  async checkTokenBalance(index: number) {
    //const address = this.accounts[index].address;
    const address = this.wallet.address;
    return await this.tokenLotteryContract.balanceOf(address);
  }

  async bet(index: number, times: bigint): Promise<any> {
    //const address = this.accounts[index].address;
    const address = this.wallet.address;

    const allowance = await this.tokenLotteryContract.approve(
      LOTTERY_ADDRESS,
      ethers.MaxUint256,
    );
    const allowanceReceipt = await allowance.wait();

    const tx = await this.lotteryContract.betMany(times);
    await tx.wait();

    const ethBalance = await this.provider.getBalance(address);
    const eth = ethers.formatEther(ethBalance);

    const tokenBalance = await this.tokenLotteryContract.balanceOf(address);
    return { ethBalance: eth, tokensBalance: tokenBalance.toString() };
  }

  async closeBets(): Promise<any> {
    try {
      const tx = await this.lotteryContract.closeLottery();
      const receipt = await tx.wait();

      return { success: true, txHash: receipt.hash };
    } catch (error) {
      // Handle the error here
      console.error('An error occurred while closing bets:', error);

      // Extract the "Already closed" part from the error message
      const errorMessage = error.message || '';
      const match = errorMessage.match(/"([^"]+)"/);
      const specificError = match ? match[1] : 'Unknown error';

      return { success: false, error: specificError };
    }
  }

  async checkPlayerPrize(index: number): Promise<bigint> {
    //const address = this.accounts[index].address;
    const address = this.wallet.address;
    return await this.lotteryContract.prize(address);
  }

  async claimPrize(index: number): Promise<any> {
    //const address = this.accounts[index].address;
    const address = this.wallet.address;
    const prize = await this.lotteryContract.prize(address);
    const tx = await this.lotteryContract.prizeWithdraw(prize);
    await tx.wait();

    return { success: true, withdraw: prize.toString() };
  }

  async withdraw(amount: bigint): Promise<any> {
    const tx = await this.lotteryContract.ownerWithdraw(amount);
    const receipt = await tx.wait();

    return { success: true, txHash: receipt.hash, amount: amount };
  }

  async burnTokens(index: number, amount: bigint): Promise<any> {
    //const address = this.accounts[index].address;
    const address = this.wallet.address;
    const allowance = await this.tokenLotteryContract.approve(
      LOTTERY_ADDRESS,
      amount,
    );
    const allowanceReceipt = await allowance.wait();

    const tx = await this.lotteryContract.returnTokens(amount);
    const burnReceipt = await tx.wait();

    const balance = await this.provider.getBalance(address);
    const ethBalance = ethers.formatEther(balance);

    const tokenBalance = await this.tokenLotteryContract.balanceOf(address);

    return {
      success: true,
      allowanceHash: allowanceReceipt.hash,
      burnHash: burnReceipt.hash,
      ethBalance: ethBalance,
      tokenBalance: tokenBalance.toString(),
    };
  }
}

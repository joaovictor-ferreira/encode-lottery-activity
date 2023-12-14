import { ethers } from "hardhat";
import { LotteryToken__factory, Lottery__factory } from "../typechain-types";

async function main() {
  const BET_PRICE = "0.001";
  const BET_FEE = "0.0000002";
  const TOKEN_RATIO = 10000n;

  const contractFactory = await ethers.getContractFactory("Lottery");
  const contract = await contractFactory.deploy(
    "Lottery",
    "SYM",
    TOKEN_RATIO,
    ethers.parseUnits(BET_PRICE, 18),
    ethers.parseUnits(BET_FEE, 18)
  );
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(`Lottery contract deployed at ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

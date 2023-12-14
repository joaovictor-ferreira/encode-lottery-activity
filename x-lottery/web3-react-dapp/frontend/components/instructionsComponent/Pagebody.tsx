import { useAccount, useNetwork } from "wagmi";
import { useState, useEffect } from "react";
import CheckState from "./CheckState_gonza";
import OpenBets from "./OpenBets_gonza";
import BuyTokens from "./BuyTokens";
import TokenBalance from "./TokenBalance";
import Bet from "./Bet";
import CloseLottery from "./CloseLottery";
import Prize from "./Prize";
import Claim from "./Claim";
import Pool from "./Pool";
import Withdraw from "./Withdraw";
import Burn from "./Burn";

export default function PageBody() {
  return (
    <>
      <CheckState></CheckState>
      <OpenBets></OpenBets>
      <BuyTokens></BuyTokens>
      <TokenBalance></TokenBalance>
      <Bet></Bet>
      <CloseLottery></CloseLottery>
      <Prize></Prize>
      <Claim></Claim>
      <Pool></Pool>
      <Withdraw></Withdraw>
      <Burn></Burn>
    </>
  );
}

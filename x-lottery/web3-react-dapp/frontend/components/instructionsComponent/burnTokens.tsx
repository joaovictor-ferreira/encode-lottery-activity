import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";

function BurnTokens() {
  const [accountIndex, setAccountIndex] = useState<number | string>("");
  const [burnAmount, setBurnAmount] = useState<number | string>("");
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [lt0Balance, setLt0Balance] = useState<number | null>(null);
  const [allowanceTxHash, setAllowanceTxHash] = useState<string | null>(null);
  const [burnTxHash, setBurnTxHash] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<number | null>(null);
  const [showBalances, setShowBalances] = useState(false);

  const handleRequest = async () => {
    try {
      // Send a POST request to the /burn-tokens endpoint with the entered index and amount
      const response = await axios.post("http://localhost:3001/burn-tokens", {
        index: Number(accountIndex),
        amount: burnAmount,
      });

      // Handle the response from your backend here
      const {
        accountAddress,
        lt0Balance,
        allowanceTxHash,
        burnTxHash,
        ethBalance,
      } = response.data;

      setAccountAddress(accountAddress);
      setLt0Balance(lt0Balance);
      setAllowanceTxHash(allowanceTxHash);
      setBurnTxHash(burnTxHash);
      setEthBalance(ethBalance);
      setShowBalances(true);
    } catch (error) {
      // Handle errors here
      console.error("Request failed:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      margin="20px auto"
      alignItems="center"
    >
      <Typography variant="h4" style = {{fontFamily: 'Poppins, sans-serif'}}>Burn Tokens</Typography>

      <TextField
        fullWidth
        label="Account Index (Number)"
        variant="outlined"
        type="number"
        value={accountIndex}
        onChange={(e) => setAccountIndex(e.target.value)}
      />

      <TextField
        fullWidth
        label="Burn Amount (String)"
        variant="outlined"
        type="text"
        value={burnAmount}
        onChange={(e) => setBurnAmount(e.target.value)}
      />

      <Button variant="contained" color="secondary" onClick={handleRequest} style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
        Send Request
      </Button>

      {accountAddress && lt0Balance !== null && (
        <Typography variant="h6" style = {{fontFamily: 'Poppins, sans-serif'}}>
          The account of address {accountAddress} has {lt0Balance} LT0
        </Typography>
      )}

      {allowanceTxHash && (
        <>
          <Typography variant="h6" align="center">
            Allowance confirmed
          </Typography>
          <Typography variant="h6" align="center">
            Transaction Hash: {allowanceTxHash}
          </Typography>
        </>
      )}

      {burnTxHash && (
        <>
          <Typography variant="h6" align="center">
            Burn confirmed
          </Typography>
          <Typography variant="h6" align="center">
            Transaction Hash: {burnTxHash}
          </Typography>
        </>
      )}

      {showBalances && ethBalance !== null && (
        <Typography variant="h6">
          The account of address {accountAddress} has {ethBalance} ETH
        </Typography>
      )}

      {showBalances && lt0Balance !== null && (
        <Typography variant="h6">
          The account of address {accountAddress} has {lt0Balance} LT0
        </Typography>
      )}
    </Box>
  );
}

export default BurnTokens;

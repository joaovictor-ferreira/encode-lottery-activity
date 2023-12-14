import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, TextField, Box } from "@mui/material";

function TopUpAccountTokens() {
  const [account, setAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [tokensBought, setTokensBought] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);

  // Function to simulate API call to check ETH balance
  const checkEthBalance = async () => {
    try {
      // Send a GET request to check ETH balance with the address as a query parameter
      const response = await axios.get(
        `http://localhost:3001/check-eth-balance?address=${account}`
      );

      // Update the state with the received ETH balance as a string
      setEthBalance(response.data);
    } catch (error) {
      console.error("Error checking ETH balance:", error);
      // Handle errors here (e.g., show an error message)
    }
  };

  // Function to simulate API call to buy tokens
  const buyTokens = async () => {
    try {
      // Send a POST request to buy tokens
      const response = await axios.post("http://localhost:3001/buy-tokens", {
        index: account, // Assuming index corresponds to the account
        amount: amount || "0.001", // Default amount or user-entered amount
      });

      // Update the state with the received data as strings
      setTokensBought(response.data.tokensBalance);
      setEthBalance(response.data.ethBalance);
    } catch (error) {
      console.error("Error buying tokens:", error);
      // Handle errors here (e.g., show an error message)
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
      <Typography variant="h4"   style = {{fontFamily: 'Poppins, sans-serif'}}> Account's Tokens</Typography>
      <TextField
        fullWidth
        label="Account"
        variant="outlined"
        value={account}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setAccount(e.target.value)
        }
      />
      <Button variant="contained" color="secondary" onClick={checkEthBalance}   style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
        Check ETH Balance
      </Button>
      {ethBalance !== null && (
        <Typography variant="h6"  style = {{fontFamily: 'Poppins, sans-serif'}}>
          The account's ETH balance is: {ethBalance}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Amount"
        variant="outlined"
        type="text" // Change the input type to "text"
        value={amount}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setAmount(e.target.value)
        }
      />
      <Button variant="contained" color="secondary" onClick={buyTokens} style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
        Buy Tokens
      </Button>
      {tokensBought !== null && (
        <Typography variant="h6">Tokens bought: {tokensBought}</Typography>
      )}
    </Box>
  );
}

export default TopUpAccountTokens;

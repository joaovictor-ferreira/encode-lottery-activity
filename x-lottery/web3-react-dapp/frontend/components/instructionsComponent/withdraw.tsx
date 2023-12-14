import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";

function Withdraw() {
  const [withdrawAmount, setWithdrawAmount] = useState<number | string>("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleWithdraw = async () => {
    try {
      // Send a POST request to the /withdraw endpoint with the entered amount
      const response = await axios.post("http://localhost:3001/withdraw", {
        amount: Number(withdrawAmount), // Convert withdrawAmount to a number
      });

      // Handle the response from your backend here
      const transactionHash = response.data.transactionHash; // Adjust this based on your backend response
      setTransactionHash(transactionHash);
    } catch (error) {
      // Handle errors here
      console.error("Withdrawal failed:", error);
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
      <Typography variant="h4" style = {{fontFamily: 'Poppins, sans-serif'}}>Withdraw Funds</Typography>

      <TextField
        fullWidth
        label="Enter the amount to be withdrawn"
        variant="outlined"
        type="number"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleWithdraw} style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
        Withdraw
      </Button>

      {transactionHash && (
        <>
          <Typography variant="h6" align="center" style = {{fontFamily: 'Poppins, sans-serif'}}>
            Withdraw confirmed
          </Typography>
          <Typography variant="h6" align="center" style = {{fontFamily: 'Poppins, sans-serif'}}>
            Transaction hash: {transactionHash}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default Withdraw;

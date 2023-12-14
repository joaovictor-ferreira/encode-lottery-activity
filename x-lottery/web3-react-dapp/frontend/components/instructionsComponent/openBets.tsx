import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box } from "@mui/material";

function OpenBets() {
  const [duration, setDuration] = useState<number | string>("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // New state for error message
  const [showTextBox, setShowTextBox] = useState<boolean>(false);

  const handleOpenBets = async () => {
    try {
      const response = await axios.post("http://localhost:3001/open-bets");

      if (response.data.success) {
        setTransactionHash(response.data.txHash);
        setError(null); // Clear any previous error
      } else {
        // Handle the case where the backend response indicates an error
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error opening bets:", error);
      setError("An error occurred while opening bets.");
    }
  };

  const toggleTextBox = () => {
    setShowTextBox(!showTextBox);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      margin="20px auto"
      alignItems="center"
    >
      <Typography variant="h4" style = {{fontFamily: 'Poppins, sans-serif'}}>Open Bets</Typography>

      <Button variant="contained" color="secondary" onClick={toggleTextBox} style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
        Open Bets
      </Button>

      {showTextBox && (
        <>
          <TextField
            fullWidth
            label="Input duration (in seconds)"
            variant="outlined"
            type="number"
            value={duration}
            onChange={(e: {
              target: { value: React.SetStateAction<string | number> };
            }) => setDuration(e.target.value)}
          />

          <Button variant="contained" color="secondary" onClick={handleOpenBets}>
            Enter
          </Button>
        </>
      )}

      {transactionHash && <Typography variant="h6">Bets opened</Typography>}

      {transactionHash && (
        <Typography variant="h6">
          Transaction Hash: {transactionHash}
        </Typography>
      )}

      {error && (
        <Typography variant="h6" style={{ color: "red" }}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
}

export default OpenBets;

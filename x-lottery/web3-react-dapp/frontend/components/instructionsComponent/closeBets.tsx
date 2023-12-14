import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";

function CloseBets() {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to send a request to close bets
  const handleCloseBets = async () => {
    try {
      // Send a POST request to the backend to close bets
      const response = await axios.post("http://localhost:3001/close-bets");

      // Check if the response indicates success
      if (response.data.success) {
        // Update the state with the received transaction hash
        setTransactionHash(response.data.txHash);
        setError(null); // Clear any previous error
      } else {
        // Handle the case where the backend response indicates an error
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error closing bets:", error);
      setError("An error occurred while closing bets.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      margin="20px auto"
      alignItems="center"
      style= {{fontFamily: 'Poppins, sans-serif'}}
    >
      <Typography variant="h4" style= {{fontFamily: 'Poppins, sans-serif'}}>Close Bets</Typography>

      <Button variant="contained" color="secondary"  style= {{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}} onClick={handleCloseBets}>
        Click to Close 
      </Button>

      {transactionHash && <Typography variant="h6">Bets Closed</Typography>}

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

export default CloseBets;

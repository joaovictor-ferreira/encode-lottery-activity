import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import Axios from "axios"; // Import Axios for making HTTP requests

function BetWithAccount() {
  const [accountIndex, setAccountIndex] = useState<number | null>(null);
  const [betTimes, setBetTimes] = useState<number | null>(null);
  const [betEntered, setBetEntered] = useState(false);
  const [backendResponse, setBackendResponse] = useState<any | null>(null);

  const handleBetInput = async () => {
    if (!accountIndex || !betTimes) {
      console.error("Account index and bet times are required.");
      return;
    }

    try {
      // Send a POST request to http://localhost:3001/bet
      const response = await Axios.post("http://localhost:3001/bet", {
        index: accountIndex,
        times: betTimes,
      });

      // Check if the response is successful
      if (response.status === 200) {
        // Display the response data
        console.log("Backend Response:", response.data);

        // Set the backend response and the state variable to true
        setBackendResponse(response.data);
        setBetEntered(true);
      } else {
        console.error("Backend request failed.");
      }
    } catch (error) {
      console.error("Error sending request to the backend:", error);
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
      <Typography variant="h4">Bet Using Account</Typography>

      <TextField
        fullWidth
        label="Which account (index) is going to be used?"
        variant="outlined"
        type="number"
        onChange={(e) => setAccountIndex(Number(e.target.value))}
      />
      <TextField
        fullWidth
        label="How many times?"
        variant="outlined"
        type="number"
        onChange={(e) => setBetTimes(Number(e.target.value))}
      />
      <Button variant="contained" color="secondary" onClick={handleBetInput} style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}> 
        Enter
      </Button>

      {betEntered && backendResponse && (
        <div>
          <Typography variant="h6">Backend Response:</Typography>
          <pre>{JSON.stringify(backendResponse, null, 2)}</pre>
        </div>
      )}
    </Box>
  );
}

export default BetWithAccount;

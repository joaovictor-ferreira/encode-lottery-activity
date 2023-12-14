import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";

function CheckPlayerPrize() {
  const [accountIndex, setAccountIndex] = useState<number | null>(null);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);
  const [claimDecision, setClaimDecision] = useState<string | null>(""); // Initialize with an empty string

  const handleAccountInput = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/check-player-prize?accountIndex=${accountIndex}`
      );

      if (response.data === 0) {
        setPrizeMessage("Player prize: 0");
      } else {
        setPrizeMessage(`Player prize: ${response.data}`);
      }
    } catch (error) {
      console.error("Error fetching player prize:", error);
    }
  };

  const handleClaimDecision = async () => {
    try {
      const response = await axios.post("http://localhost:3001/claim-prize");

      if (response.data.success) {
        setPrizeMessage("Prize claimed");
      } else {
        setPrizeMessage("Failed to claim prize");
      }
    } catch (error) {
      console.error("Error claiming prize:", error);
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
      <Typography variant="h4" style = {{fontFamily: 'Poppins, sans-serif'}}>Check Player's Prize</Typography>

      <TextField
        fullWidth
        label="Which account index is going to be used?"
        variant="outlined"
        type="number"
        onChange={(e) => setAccountIndex(Number(e.target.value))}
      />
      <Button variant="contained" color="secondary" onClick={handleAccountInput} style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
        Enter
      </Button>

      {prizeMessage && <Typography variant="h6" style = {{fontFamily: 'Poppins, sans-serif'}}>{prizeMessage}</Typography>}

      <Typography variant="h6" style = {{fontFamily: 'Poppins, sans-serif'}}>Do you want to claim your prize?</Typography>
      <Select
        fullWidth
        value={claimDecision} 
        variant="outlined"
        onChange={(e) => setClaimDecision(e.target.value as string)} 
      >
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Select>
      <Button variant="contained" color="secondary" onClick={handleClaimDecision} style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
        Enter
      </Button>
    </Box>
  );
}

export default CheckPlayerPrize;

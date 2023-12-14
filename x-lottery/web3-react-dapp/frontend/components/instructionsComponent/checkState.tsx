import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";

function CheckState() {
  // State to store the status of the lottery (true or false)
  const [lotteryStatus, setLotteryStatus] = useState<boolean | null>(null);

  // Function to send a request to the backend service
  const checkLotteryStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/check-state");

      // Assuming the backend returns a boolean value
      const isLotteryStarted = response.data;

      // Update the state with the received status
      setLotteryStatus(isLotteryStarted);
    } catch (error) {
      console.error("Error checking state:", error);
      // Handle errors here (e.g., show an error message)
    }
  };

  // Function to display the appropriate message based on the lottery status
  const renderLotteryStatus = () => {
    if (lotteryStatus === null) {
      return "Unknown";
    } else if (lotteryStatus) {
      return "started";
    } else {
      return "not started";
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      style = {{fontFamily: 'Poppins, sans-serif'}}
      margin="20px auto"
      alignItems="center"
     
    >
      <Typography variant="h4"   style = {{fontFamily: 'Poppins, sans-serif'}}>Check State</Typography>
      <Typography variant="h5"   style = {{fontFamily: 'Poppins, sans-serif'}}>
        The system status is:  {renderLotteryStatus()}
      </Typography>
      <Button variant="contained"   style = {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}} color="secondary" onClick={checkLotteryStatus} >
        Check Status
      </Button>
    </Box>
  );
}

export default CheckState;

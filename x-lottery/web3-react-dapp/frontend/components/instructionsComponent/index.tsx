import React from "react";
import CheckState from "./checkState";
import TopUpAccountTokens from "./topUpAccountTokens";
import BetWithAccount from "./betWithAccount";
import CheckPlayerPrize from "./checkPlayerPrize";
import Withdraw from "./withdraw";
import BurnTokens from "./burnTokens";
import OpenBets from "./openBets";
import CloseBets from "./closeBets";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function InstructionsComponent() {
  return (
    <Container component="main" maxWidth="lg"  >
     
      <Paper elevation={3} style={{ padding: "4rem 2.5rem", borderRadius: '0.5rem', fontFamily: 'Poppins, sans-serif'}}>
      <Box textAlign="center" marginBottom={3} >
        <Typography variant="h2" style= {{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}} >Welcome to X-Lottery</Typography>
      </Box>
        <Box textAlign="center"  fontFamily={ 'Poppins, sans-serif'}>
          <Grid item xs={12} md={6}>
            <CheckState />
          </Grid>
        </Box>
        <Divider variant="middle" style={{ marginBottom: "20px" }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TopUpAccountTokens />
          </Grid>

          <Grid item xs={12} md={6}>
            <BetWithAccount />
          </Grid>
        </Grid>
        <Divider variant="middle" style={{ margin: "20px 0" }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CheckPlayerPrize />
          </Grid>

          <Grid item xs={12} md={4}>
            <Withdraw />
          </Grid>

          <Grid item xs={12} md={4}>
            <BurnTokens />
          </Grid>
        </Grid>
        <Divider variant="middle" style={{ margin: "20px 0" }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <OpenBets />
          </Grid>

          <Grid item xs={12} md={6}>
            <CloseBets />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

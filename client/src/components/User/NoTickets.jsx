import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function NoTickets() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography variant="h1">Welcome!!!</Typography>
            <Typography variant="h1">No Tickets Created By You</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

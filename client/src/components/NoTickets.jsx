import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function NoTickets({ keyword }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid
              xs={10}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">
                {`You have Created no ${keyword}`}
              </Typography>
            </Grid>
            <Grid xs={2}>
              <img
                src="https://cdn.pixabay.com/photo/2020/12/18/01/27/smile-5840910_1280.png"
                width={200}
                height={200}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

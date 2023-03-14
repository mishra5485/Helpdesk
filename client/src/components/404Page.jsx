import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function Error() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [accesslvl, setAccesslvl] = useState(localStorage.getItem("access"));
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
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              {token && accesslvl === "user" ? (
                <Link to="/user/usertickets">
                  <Button variant="contained">Back to User Dashboard</Button>
                </Link>
              ) : token && accesslvl === "employee" ? (
                <Link to="/employee/alltickets">
                  <Button variant="contained">
                    Back to employee Dashboard
                  </Button>
                </Link>
              ) : token && accesslvl === "admin" ? (
                <Link to="/admin/ticketstable">
                  <Button variant="contained">Back to Admin Dashboard</Button>
                </Link>
              ) : (
                <Link to="/">
                  <Button variant="contained">Back to Login </Button>
                </Link>
              )}
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

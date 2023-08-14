import { Button, Grid } from "@mui/material";
import React from "react";

const MovieRightSide = ({ movie }) => {
  return (
    <Grid
      container
      item
      xs={6}
      justifyContent="center"
      sx={{ display: movie ? "flex" : "none" }}
    >
      <Grid
        container
        item
        xs={6}
        direction="column"
        justifyContent="center"
        rowSpacing={4}
      >
        <Grid container item justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ width: "50%" }}
            href={`/seats?movie=${movie}&show-time=showtime1`}
          >
            10:00 AM - 12:00 PM
          </Button>
        </Grid>
        <Grid container item justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ width: "50%" }}
            href={`/seats?movie=${movie}&show-time=showtime2`}
          >
            2:00 PM - 4:00 PM
          </Button>
        </Grid>
        <Grid container item justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{ width: "50%" }}
            href={`/seats?movie=${movie}&show-time=showtime3`}
          >
            7:00 PM - 9:00 PM
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieRightSide;

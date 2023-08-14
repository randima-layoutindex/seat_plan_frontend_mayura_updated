import { Grid } from "@mui/material";
import React from "react";

import Movie1 from ".././assets/oppenheimer.jpg";
import Movie2 from ".././assets/spiderman.jpg";

const MovieLeftSide = ({ movie, setMovie }) => {
  const handleMovieClick = (movie) => {
    setMovie(movie);
  };

  return (
    <Grid container item xs={movie ? 6 : 12} direction="row">
      <Grid container item xs={6} justifyContent="center">
        <Grid
          container
          item
          xs={8}
          alignItems="center"
          justifyContent="center"
          onClick={() => handleMovieClick("oppenheimer")}
        >
          <img
            alt="movie-1"
            src={Movie1}
            style={{
              height: "480px",
            }}
          />
        </Grid>
      </Grid>
      <Grid container item xs={6} justifyContent="center">
        <Grid
          container
          item
          xs={8}
          justifyContent="center"
          alignItems="center"
          onClick={() => handleMovieClick("spiderman")}
        >
          <img
            alt="movie-2"
            src={Movie2}
            style={{
              height: "480px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieLeftSide;

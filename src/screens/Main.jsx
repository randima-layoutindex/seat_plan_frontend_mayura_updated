import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MovieLeftSide from "../components/MovieLeftSide";
import MovieRightSide from "../components/MovieRightSide";

const Main = () => {
  const [movie, setMovie] = useState("");

  return (
    <Grid container item height="100%">
      <MovieLeftSide movie={movie} setMovie={setMovie} />
      <MovieRightSide movie={movie} />
    </Grid>
  );
};

export default Main;

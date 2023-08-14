import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Seat = ({ seatNumber, selected }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <Box
      onClick={handleClick}
      sx={{
        bgcolor: isSelected ? "red" : "blue",
        height: "150px",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ":hover": {
          bgcolor: "green",
        },
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "40px",
        }}
      >
        {seatNumber}
      </Typography>
    </Box>
  );
};

export default Seat;

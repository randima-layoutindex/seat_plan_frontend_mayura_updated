import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import io from 'socket.io-client'
import generateUniqueId from "generate-unique-id";
import bcrypt from "bcryptjs"
import {seats} from "../actions/seats"

const userId = generateUniqueId()


const socket1 = io.connect("http://localhost:3000")

const Seats = () => {
  const [seatNumbers,setSeatNumbers]=useState()


  useEffect(()=>{
    let paramsData = {
      accessCode:"1234V2",
      showTimeId:"60606060",
      name:"Rio Cinema"
    }

seats(paramsData).then((data)=>{
  console.log("This is   the fetched data",data[0])

  setSeatNumbers(data[0].seatPlan)

})
  },[])


  const [bookings, setBookings] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get("movie");
  const showTime = queryParams.get("show-time");
  let showTimeText = "";

  const [values, setValues] = useState({
    accessCode:"1234V2",
    showTimeId:"60606060"
  })
  const [newMessage, setNewMessage] = useState([])

  if (showTime === "showtime1") {
    showTimeText = "10:00 AM - 12:00 PM";
  } else if (showTime === "showtime2") {
    showTimeText = "2:00 PM - 4:00 PM";
  } else if (showTime === "showtime3") {
    showTimeText = "7:00 PM - 9:00 PM";
  }

  useEffect(() => {
    socket1.emit("join", values)

    socket1.on("onJoin", (response) => {
      console.log(response, "ON JOIN PAYLOAD")
      setNewMessage((currentMsgs) => [...currentMsgs, response])
    })
  }, [])

  useEffect(()=>{
    socket1.on("onJoin", (response) => {
      console.log(response, "ON JOIN PAYLOAD")
      setNewMessage(response)
      console.log(newMessage,"AFTER ON JOIN PAYLOAD")
    })
  },[socket1])

  useEffect(() => {
    socket1.on("onMessage", (response) => {
      console.log(response, "Recieved Payload")
      setNewMessage((currentMsgs) => [...currentMsgs, response])
    })
  }, [socket1])

  const timeCheck = (date)=>{
// Get the current international date
let currentDate = new Date().toISOString();

// Given another date in international date format
let anotherDate = date; // Example date

// Convert the given date to a Date object
let parsedDate = new Date(anotherDate);

// Add 10 minutes to the parsed date
parsedDate.setMinutes(parsedDate.getMinutes() + 10);

// Check if the modified date is greater than the current date
let isGreater = parsedDate < new Date(currentDate);

return isGreater
  }


  const checkAvailability = async(data)=>{

    // console.log(moment(newMessage[0].updatedAt),"CHECK AVAILABILITY")
    // console.log(moment(newMessage[0].updatedAt).add(10,"m").date(),"CHECK AVAILABILITY")
    // console
    // console.log(timeCheck(newMessage[0].updatedAt),"CHECK AVAILABILITY")
    
    if(newMessage.length <= 0){
      return false
    }
    let availability = true
    for(let i = 0;i<newMessage.length;i++){
      // console.log(timeCheck(newMessage[i].updatedAt),"CHECK AVAILABILITY")
      availability =  newMessage[i].seatId == data.seatNumber
      if(newMessage[i].seatId == data.seatNumber){
        data.isHold = newMessage[i].onHold
        let authorized;
        if(newMessage[i].tempId.length <= 0){
          authorized = false
          data.isCanUnHold = false
        }

        // let isSameUser = await bcrypt.has(userId,2)
        // if(isSameUser == newMessage[i].tempId){
        //   authorized = true
        //   data.isCanUnHold = true
        // }else{
        //   authorized = false
        //   data.isCanUnHold = false
        // }
        if(newMessage[i].tempId == userId){
          authorized = true
          data.isCanUnHold = true
        }else{
          authorized = false
          data.isCanUnHold = false
        }

        if(timeCheck(newMessage[i].updatedAt)){
          authorized = true
          data.isCanUnHold = true
          data.onHold = false
          data.tempId = ""
          data.isHold = false
        }



      }

    }
    return availability
  }

useEffect(() => {
}, [newMessage])


const seatOnHold = async(data)=>{
  console.log(data.isCanUnHold,"CAN UNHOLD.........")
  if(data.isHold && data.isCanUnHold == false){
    alert("This seat is currently on hold by other user.Please check later whether its available..")
    return;
  }

  data.isHold = !data.isHold

  

  let tempPayload = {
    "accessCode": values.accessCode,
    "showTimeId":values.showTimeId,
    "payload":{
        "seatId":data.seatNumber,
        "onHold":data.isHold,
   
        "canUnhold":false,
  
        "tempId":userId,
        "id":`${values.accessCode}-${values.showTimeId}-${data.seatNumber}`
   
    }
}

  socket1.emit("newMessage",tempPayload)

}





  useEffect(() => {

    setSelectedSeats(bookings);
  }, [bookings]);

  // const sendBooking = (message) => {
  //   // console.log(message);
  //   socket.emit("booking", message);
  //   setBooking("");
  // };

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid container justifyContent="center" height="5%" alignItems="end">
        <Button
          variant="contained"
          disableElevation
          href="/"
          sx={{ height: "80%", textTransform: "none" }}
        >
          Home
        </Button>
      </Grid>
      <Grid
        container
        item
        xs={12}
        height="20%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h4"
          align="center"
          textTransform="capitalize"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          {movieName} ({showTimeText})
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="75%"
        px="60px"
      >
        <Grid
          container
          columnSpacing={2}
          rowSpacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {/* {
          seatNumbers && console.log(seatNumbers,"from the map functions ")
        
        }
        {
          newMessage && console.log(newMessage,"NEW MESSAGES FROM THE MAP FUNCTIONS")
        } */}
          {
            seatNumbers && seatNumbers.map((seatNumber,index)=>{
    
              checkAvailability(seatNumber)
          
              return <div key={index} style={{background:
                seatNumber.isHold ? "red":"green",margin:"1rem",border:"solid white 5px"}} onClick={()=>seatOnHold(seatNumber)}><h2>{seatNumber.seatNumber}</h2></div>

            })
          }

        </Grid>
      </Grid>
    </Box>
  );
};

export default Seats;

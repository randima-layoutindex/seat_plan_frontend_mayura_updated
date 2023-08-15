import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Seat from "../components/Seat";
import { useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import io from 'socket.io-client'
import generateUniqueId from "generate-unique-id";
import bcrypt from "bcryptjs"
import axios from "axios"
import {seats} from "../actions/seats"

const userId = generateUniqueId()


const socket1 = io.connect("http://localhost:3000")

const Seats = ({ socket }) => {
  // let seatNumbers;

  const [seatNumbers,setSeatNumbers]=useState()
  //  [
  //   {seatId:"A10",onHold:false,canUnhold:true,tempId:""},
  //   {seatId:"A20",onHold:false,canUnhold:true,tempId:""},
  //   {seatId:"A30",onHold:false,canUnhold:true,tempId:""},
  //   {seatId:"A40",onHold:false,canUnhold:true,tempId:""},
  //   {seatId:"B10",onHold:false,canUnhold:true,tempId:""},
  //   {seatId:"B20",onHold:false,canUnhold:true,tempId:""},
  //   {seatId:"B30",onHold:false,canUnhold:true,tempId:""},
  //   {seatId:"B40",onHold:false,canUnhold:true,tempId:""},
  //   // "A20",
  //   // "A30",
  //   // "A40",
  //   // "A50",
  //   // "B10",
  //   // "B20",
  //   // "B30",
  //   // "B40",
  // ];

  useEffect(()=>{
    let paramsData = {
      accessCode:"1234V2",
      showTimeId:"60606060"
    }
    // accessCode:"12Cy34",
    // showTimeId:"showtime1"
seats(paramsData).then((data)=>{
  console.log("This is the fetched data",data[0])
  // seatNumbers = data[0].seatPlan
  setSeatNumbers(data[0].seatPlan)
  // console.log(seatNumbers)
})
  },[])

  const [booking, setBooking] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get("movie");
  const showTime = queryParams.get("show-time");
  let showTimeText = "";

  const [values, setValues] = useState({
    accessCode: 123,
    showTimeId: 456
  })
  const [newMessage, setNewMessage] = useState([])
  // console.log(movieName, showTime);



  if (showTime === "showtime1") {
    showTimeText = "10:00 AM - 12:00 PM";
  } else if (showTime === "showtime2") {
    showTimeText = "2:00 PM - 4:00 PM";
  } else if (showTime === "showtime3") {
    showTimeText = "7:00 PM - 9:00 PM";
  }

  useEffect(() => {
    // setValues({accessCode:123,showTimeId:456})
    // console.log(values)
    socket1.emit("join", values)

    // socket.emit("findAllMessages",{},(response)=>{
    //   setSeat(response)
    // })
  }, [])

  useEffect(() => {
    socket1.on("onMessage", (response) => {
      console.log(response, "Recieved Payload")
      setNewMessage((currentMsgs) => [...currentMsgs, response])
      // console.log(newMessage)
      // let tempArray = [...JSON.localStorage.getItem("newMessages"),JSON.stringify(response)]

      // localStorage.setItem("newMessages",tempArray)
      // setNewMessage((current)=>...current,response)
    })

   
  }, [socket1])

  let onHoldseets = []


  const checkAvailability = async(data)=>{

    // console.log(data,"This is the data bieng passed to the each seat components CHECK AVAILABILITY FUNCTION")
    if(newMessage.length <= 0){
      return false
    }
    let availability = true
    // console.log(newMessage,"incoming seat data...",data)


    for(let i = 0;i<newMessage.length;i++){
      // console.log(newMessage[i].content.seatId,"current seat",data,newMessage[i].content.seatId == data,typeof newMessage[i].content.seatId,typeof data)
      // availability =  newMessage[i].content.seatId == data
      availability =  newMessage[i].content.seatId == data.seatNumber
      // if(newMessage[i].content.seatId == data.seatId){
      if(newMessage[i].content.seatId == data.seatNumber){
        // data.onHold = newMessage[i].content.onHold
        // console.log(seatNumbers,"+++++++++++++++++++++++++++")
        data.isHold = newMessage[i].content.onHold
        // console.log(seatNumbers,"+++++++++++++++++++++++++++")
        // console.log(data.seatId,data.tempId,data.canUnhold,"-----------TEMP ID--------------",data.tempId.length)
        // console.log( bcrypt.compare(userId,data.tempId))
        // console.log(newMessage[i].content.tempId,userId,data,"This is the comparison of incoming user id and current user id")
        // console.log(newMessage[i].content.tempId,userId,data,"This is the comparison of incoming user id and current user id")
        let authorized;
        // let authorized = await bcrypt.compare(userId,newMessage[i].content.tempId)
        // console.log(newMessage[i].content.tempId,userId,newMessage[i].content.tempId == userId,"USER ID TEMP ID TEST")
        
        console.log("payload id",newMessage[i].content.tempId,"current id",userId)
        if(newMessage[i].content.tempId.length <= 0){
          authorized = false
          data.isCanUnHold = false
        }
        if(newMessage[i].content.tempId == userId){
          authorized = true
          data.isCanUnHold = true
        }else{
          authorized = false
          data.isCanUnHold = false
        }
        console.log(authorized,"Authorized...",data.isCanHold,"can unhold")
        // console.log(authorized,"TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT.",data.isCanUnhold,"currentTempId",data.tempId,"payloadTempId",newMessage[i].content.tempId,"userId",userId)
        // if(authorized){
        //   // data.canUnhold = true
        //   data.isCanUnhold = true
        // }else{

        //   // data.canUnhold = newMessage[i].content.canUnhold
        //   data.isCanUnhold = false
        //   // data.isCanUnhold = newMessage[i].content.canUnhold
        // }
        console.log(authorized,"Authorized...",data.isCanHold,"can unhold")
        // console.log(authorized,"TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT.",data.isCanUnhold,"currentTempId",data.tempId,"payloadTempId",newMessage[i].content.tempId,"userId",userId)
        // data.onHold = true
      }
// console.log("This is the data",data)
      
      // availability =  newMessage[i].payload["seatId"] == data.payload["seatId"]
    }
    return availability
  }

useEffect(() => {
  // console.log("newMessage", newMessage,newMessage.length);
  // for (let i = 0;i<newMessage.length,i++;){
    // console.log(i,"this is inside onhold array")
    // console.log(newMessage[i])
    // onHoldseets.append(newMessage[i].content.seat)
  // }
  // console.log(seatNumbers,"All messaages after recieving payload")
  // console.log(newMessage,"All the new payloads array")
  
}, [newMessage])
// console.log( onHoldseets)


const seatOnHold = async(data)=>{
  // console.log(data, "This is from seat unhold-----------------")
  // console.log(data.onHold,data.canUnhold,data,userId, "This is from seat unhold-----------------")


  // if(data.onHold && data.canUnhold == false){
    // console.log(data.isHold,data.isCanHold,data.isHold && data.isCanHold == false,"ALERT")
  if(data.isHold && data.isCanUnHold == false){
    alert("This seat is currently on hold by other user.Please check later whether its available..")
    return;
  }
  // console.log(userId,"------------------------------------------------------this is the USER ID")
let userKey = await bcrypt.hash(userId,2)
  // data.onHold = !data.onHold
  // console.log(data,"-----------------------")
  data.isHold = !data.isHold
  // console.log(data,"-----------------------")
  let tempPayload = {
    "accessCode": 123,
    "showTimeId":456,
    "payload":{
        "seatId":data.seatNumber,
        "onHold":data.isHold,
        // "seatId":data.seatId,
        // "onHold":data.onHold,
        "canUnhold":false,
        "tempId":userId
        // "tempId":userKey
    }
}
  socket1.emit("newMessage",tempPayload)
  // data.tempId = userId
  // data.canUnhold = true
  // data.tempId = generateUniqueId({length:10})
  // data.tempId = !data.tempId
  // console.log(data,"===========after generating the temp id===================")
  // console.log(seatNumbers)
  
  
}





  useEffect(() => {
    // console.log(bookings);
    setSelectedSeats(bookings);
  }, [bookings]);

  const sendBooking = (message) => {
    // console.log(message);
    socket.emit("booking", message);
    setBooking("");
  };

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
        >{
          seatNumbers && console.log(seatNumbers,"from the map functions ")
        }
          {
            seatNumbers && seatNumbers.map((seatNumber,index)=>{
              // console.log(seatNumber.seatNumber,"???????????????//")
              checkAvailability(seatNumber)
              // console.log(seatNumber.onHold)
              return <div key={index} style={{background:
                seatNumber.isHold ? "red":"green"}} onClick={()=>seatOnHold(seatNumber)}><h2>{seatNumber.seatNumber}</h2></div>
                // checkAvailability(seatNumber) ? "red":"green"}}><h2>{seatNumber.seatId}</h2></div>
            //   if(checkAvailability(seatNumber)){
            //     return <div key={index} style={{background:"green"}}><h2>{seatNumber}</h2></div>
            //   }else{

            //     return <div key={index} style={{background:"red"}}><h2>{seatNumber}</h2></div>
            //   }

            })
          }
          {/* {seatNumbers.map((seatNumber, index) => (
            <Grid
              key={index}
              item
              xs={1}
              justifyContent="center"
              onClick={() => {
                sendBooking(seatNumber);
              }}
            >
              <Seat
                seatNumber={seatNumber}
                selected={selectedSeats.includes(seatNumber)}
              />
            </Grid>
          ))} */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Seats;

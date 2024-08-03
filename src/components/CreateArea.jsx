import React, { useState } from "react";
import { useRef } from "react";
import emailjs from 'emailjs-com';
import SendIcon from '@mui/icons-material/Send';
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import camcell, {tycell, companyemail, serviceid, templateid, publickey} from "./config.js";
import satguar from "./sg.png";
import fullyins from "./finsured.png";
import { animated, useSpring } from '@react-spring/web';

function CreateArea(props) {
  const styles = useSpring({
      from: { opacity: "0" },
      to: { opacity: "1" },
      config: { duration: "2000" }
  });
  const form = useRef();
  const[isExpanded, setExpanded] = useState(false);
  const[isusExpanded, setusExpanded] = useState(false);
  function handleClick (event){
    setExpanded(true);
  }
  function handleusClick (event){
    setusExpanded(true);
  }

  async function postRequest (contactinfo,contactname,contactaddress){
    const response = await fetch("http://localhost:3000",{
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      mode: "no-cors",
  
     body: new URLSearchParams({
        'custName': contactname,
        'custContact': contactinfo,
        'custAddress': contactaddress
      })
      });
    try {
      console.log("fetch success");
    }catch (err) {
      console.log(err);
    }
  }

  function sendEmail(event) {
    event.preventDefault();
    const inputname = event.target[0].value;
    const inputcontact = event.target[1].value;
    const inputaddress = event.target[2].value;
    if (inputname.length === 0){
      alert("Please enter a name");
      return;
    }
    if (inputcontact.length === 0){
      alert("Please enter contact informaton");
      return;
    }
    emailjs.sendForm(serviceid, templateid, form.current, publickey)
      .then((result) => {
          console.log("success");
          alert("Your free estimate request has been sent");
          postRequest(inputcontact, inputname, inputaddress);
     
      }, (error) => {
          console.log("server here");
          console.log(error.text);
      });
  }

  return (
    <div class="divarea">
      <p></p>
      <div class="container">
      <div class="row">
      <animated.img style={styles} class="col-md-2 mx-auto" width="100px" height="100px" src={satguar}></animated.img>
      <p class="col-md-8 mx-auto" style={{color: "whitesmoke"}}>Welcome to our website, where we are on a mission to provide exceptional painting services to customers in the areas we serve. We believe that painting doesn't have to be stressful or complicated, and we are passionate about making the process as seamless and enjoyable as possible.</p>
      <animated.img style={styles} class="col-md-2 mx-auto" width="100px" height="100px" src={fullyins}></animated.img>
      <div style={{color: "#ff4c68"}}>
      <p class="col-4 mx-auto"><i><b>"We open life's doors by painting them!"</b></i></p>
      </div>
      </div></div>

      <form className="create-note">
        <textarea
          name="content"
          onClick={handleusClick}
          placeholder="Contact us..."
          rows="1"
        />
        {isusExpanded ? <p>Cells: {camcell} {tycell}<br></br> Email: {companyemail}</p> : ""}
      </form>
    
      <form onSubmit={sendEmail} ref={form} name="message" className="create-note">
        <input
          onClick={handleClick}
          name="from_name"
          placeholder={isExpanded ? "Enter your name..." : "Click to get a free estimate..."}
          rows={isExpanded ? "5" : "1"}
        />
        {isExpanded ?
        <input
          name="custcontact"
          placeholder="Your contact information..."
        /> : ""}
        {isExpanded ?
        <input
          name="custaddress"
          placeholder="Address..."
        /> : ""}
        {isExpanded ?
        <input
          name="numofrooms"
          onClick={handleClick}
          placeholder={isExpanded ? "Enter number of rooms..." : ""}
        /> : ""}
        {isExpanded ?
        <input
          name="squarefoot"
          placeholder="Est square footage..."
        /> : ""}
        <Zoom in={isExpanded ? true : false}>
        <Fab type="submit" size="large" ><SendIcon /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

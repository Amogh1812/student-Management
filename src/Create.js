import { useState,useRef } from "react"
import axios from "axios"
import { ErrorResponse } from "@remix-run/router";
export default function Create(){
    const rName= useRef();
    const[name,setName]=useState("")
    const[rno,setRno]=useState("")
    const[marks,setMarks]=useState("")

    const hname=(event)=>{setName(event.target.value);}
    const hrno=(event)=>{setRno(event.target.value);}
    const hmarks=(event)=>{setMarks(event.target.value);}

    const save=(event)=>{
        event.preventDefault();
        // let data = name+" "+email+" "+feedback;

        // alert(data);
        let urladd= "http://localhost:9999/create";
        let data={name,rno,marks};
        axios.post(urladd, data)
        .then(res => {
          if (res.status === 201) {
            alert("Record created");
            // Rest of the code
            setName("");
            setRno("");
            setMarks("");
            rName.current.focus();
          } 
        })
        .catch((error) => {
            if( error.response && error.response.status==409){
                alert("Record already exists");
                setName("");
                setRno("");
                setMarks("");
                rName.current.focus();
            }
         else if (error.code === "ERR_NETWORK") {
            alert("Server down! Please try again later.");
            // Rest of the code
             setName("");
        setRno("");
        setMarks("");
        rName.current.focus();
          } 
        });
        
    }
    return(
        <>
        <center>
            <h1>Create page</h1>
            <form onSubmit={save}>
                <input type="text" placeholder="Enter your name" onChange={hname} value={name} ref={rName}/>
                <br/><br/>
                <input type="number" placeholder="Enter your Roll no" onChange={hrno} value={rno}/>
                <br/><br/>
                <input type="number" placeholder="Enter your marks " onChange={hmarks} value={marks}></input>
                <br/><br/>
                <input type='submit' placeholder="Enter your name"/>
                <br/><br/>
            </form>
        </center>
        </>
    )
}
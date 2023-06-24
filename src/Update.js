import { useState,useRef ,useEffect} from "react"
import axios from "axios"
import { ErrorResponse } from "@remix-run/router";
import { useNavigate,useLocation } from "react-router-dom";
export default function Update(){
    const nav=useNavigate();
    const loc=useLocation();
     
    useEffect( ()=>{
        setName(loc.state.n)
        setRno(loc.state.i)
        setMarks(loc.state.f)
    },[])

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
        let urladd= "http://localhost:9999/change";
        let data={name,rno,marks};
        axios.put(urladd, data)
        .then(res => {
        
            alert("Record updated");
            // Rest of the code
           nav("/")
          
            
          
        })
        .catch((error) => {
           
          if (error.code === "ERR_NETWORK") {
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
            <h1>Update page</h1>
            <form onSubmit={save}>
                <input type="text" placeholder="Enter your name" onChange={hname} value={name} ref={rName}/>
                <br/><br/>
                <input type="number" placeholder="Enter your email" onChange={hrno} value={rno} disabled={true}/>
                <br/><br/>
                <input type="number"  placeholder="Enter your marks " onChange={hmarks} value={marks}></input>
                <br/><br/>
                <input type='submit' placeholder="Enter your name"/>
                <br/><br/>
            </form>
        </center>
        </>
    )
}
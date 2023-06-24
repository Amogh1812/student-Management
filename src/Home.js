import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function Home(){
    const nav=useNavigate();
    const [data, setData]=useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:9999/read");
            setData(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
      const deleteStudent=(rno)=>{
       let urladd="http://localhost:9999/remove"
       let data={data:{rno}};
       axios.delete(urladd,data)
       .then(res=>{
        alert("record deleted")
        window.location.reload()
       })
       .catch(err=>{
        console.log(err)
       })
      }
      const updateStudent=(name,rno,marks)=>{
        nav("/update", {state:{n:name,i:rno,f:marks}})
      }
    return(
        <>
        <center>
            <h1>Home page</h1>
            <table border="4" style={{"width":"70%"}}>
                <tr>
                    <th>Name</th>
                    <th>Rollno</th>
                    <th>Marks</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
                {
                    data.map( (e) =>(
                        <tr style={{"textAlign":"center"}}>
                            <td>{e.name}</td>
                            <td>{e.rno}</td>
                            <td>{e.marks}</td>
                            <td><button onClick={ ()=>{ if(window.confirm('are you sure you want to delete?'))deleteStudent(e.rno)}}>Delete</button></td>
                            <td><button onClick={ ()=>{ updateStudent(e.name,e.rno,e.marks)}}>Update</button></td>
                        </tr>
                    ))
                }
            </table>
        </center>
        </>
    )
}
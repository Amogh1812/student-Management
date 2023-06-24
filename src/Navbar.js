import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
export default function Navbar(){
    const { loginWithRedirect,isAuthenticated,logout ,user} = useAuth0();
    return(
        <>
        <center>
            <div className="nav">

            <Link to='/'>Home</Link>
            <Link to='/create'>Create</Link>
            {/* {isAuthenticated && <p style={{color:"white"}}>{user.name}</p>} */}
            { isAuthenticated ? (
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button>
            ):(
                <button onClick={() => loginWithRedirect()}>Log In</button>

            )

            }
       
             </ div>
        </center>
        </>
    )
}
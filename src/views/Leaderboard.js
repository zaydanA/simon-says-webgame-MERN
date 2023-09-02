
import React ,{useState,useEffect}from 'react';
import '../style/Leaderboard.css';
import jwt_decode from "jwt-decode"


const Leaderboard = (leaderboardData) => {
    
    // console.log(leaderboardData.data);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    function handleCallbackResponse(response){
        // console.log(response.credential);
        var userObject = jwt_decode(response.credential);
        // console.log(userObject);
        leaderboardData.function(userObject);
        setIsLoggedIn(true)
        document.getElementById('signInDiv').hidden=true;
    }

    function handleSignOut(event){
        leaderboardData.function({});
        leaderboardData.logoutFunction(0);
        setIsLoggedIn(false);
        document.getElementById('signInDiv').hidden=false;
    }

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id:"431307438494-ogbtnesniqq4g17gruhspia6iu3nrj4k.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.disableAutoSelect();
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),{theme:"outline",size:"large",shape: "pill",logo_alignment: "left"
            }
        )
        google.accounts.id.prompt();

    },[])
    return (
    <main>
          <div id="header">
            <h1>Ranking</h1>
          </div>
          <div id="leaderboard">
            {/* <div className="ribbon"></div> */}
            <table>
            {leaderboardData.data.map((mappedArr,index)=>{
                return(
                <tr>
                <td className="number">{index+1}</td>
                <td className="name">{mappedArr.username}</td>
                <td className="points">
                {mappedArr.highestLevel}
                </td>
              </tr>)
            })}

            </table>
          </div>
            <div id="buttons">
                {
                    isLoggedIn?  <button className='continue' onClick={()=>{handleSignOut()}}>Sign Out</button> : <div></div>
                }
                <div id='signInDiv'>Sign In</div>
              
            </div>
        </main>
    )
}

export default Leaderboard;
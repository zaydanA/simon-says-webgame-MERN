
import '../style/App.css';

import Leaderboard from './Leaderboard.js';
import React, { useState ,useEffect} from 'react';
import greenSound from '../sounds/green.mp3';
import blueSound from '../sounds/red.mp3';
import purpleSound from '../sounds/purple.mp3';
import redSound from '../sounds/red.mp3';
import whiteSound from '../sounds/white.mp3';
import yellowSound from '../sounds/yellow.mp3';
import wrongSound from '../sounds/wrong.mp3';

const buttonColours = ['red', 'blue', 'green', 'yellow', 'purple', 'white'];
// let gamePattern2=[];
// let userPattern2=[];

// let greenPressed=false;
// let redPressed=false;
// let bluePressed =false;
// let purplePressed = false;
// let whitePressed=false;
// let yellowPressed=false;
// let isWrong =false;

let gamePattern2=[];
let userPattern2=[];
let isUserTurn=false;
function App() {
  const [leaderboardData,setLeaderboardData]=useState([{},{},{}])
  const [startStop,setStartStop]=useState("start")
  const [isStarted,setIsStarted]=useState(false);
  const [level,setLevel]=useState(0);
  const [highestLevel,setHighestLevel]=useState(0);
  const [greenPressed, setGreenPressed] = useState(false);
  const [redPressed, setRedPressed] = useState(false);
  const [bluePressed, setBluePressed] = useState(false);
  const [purplePressed, setPurplePressed] = useState(false);
  const [whitePressed, setWhitePressed] = useState(false);
  const [yellowPressed, setYellowPressed] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const [user,setUser]=useState({});
 
  const getData= async ()=>{
    const response = await fetch("http://localhost:4000/leaderboard");
    const data = await response.json();
    setLeaderboardData(data);
  }
  useEffect(() => {
    getData();
  },[level,startStop,isWrong,isStarted,greenPressed,whitePressed,redPressed,bluePressed,purplePressed,yellowPressed,isWrong,user]);

  useEffect(() => {
    const postData= async ()=>{
      if(user.email){
        const response = await fetch("http://localhost:4000/leaderboard",
        {method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.name,email: user.email })});
        const data= await response.json();
        // console.log(data)
        setHighestLevel(data);
      }else{

      }
      
    }
    postData();
  }, [user]);

  const updateData = async ()=>{
    if(user.email){
      const response = await fetch(`http://localhost:4000/leaderboard/${user.name}`,
      {method:'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email,highestLevel:highestLevel })});
      await response.json();
    }else{

    }
  }

  useEffect(()=>{updateData()},[highestLevel]);
  
  const chooseUser = (data) => {
    // console.log(data)
    setUser(data);
  };
  const startGame = () => {    
    if(!isStarted){
      setIsWrong(false);
      setIsStarted(true);
      setStartStop("stop");
      setTimeout(nextSequence,500);
    }else{
      isUserTurn=false;
      userPattern2=[];
      setIsWrong(true);
      setStartStop("start")
      var wrongSounds=new Audio(wrongSound);
      wrongSounds.play();
      if(level>highestLevel){
        setHighestLevel(level);
      }
      gamePattern2=[];
      setLevel(0);
      setIsStarted(false);
    }
  }

  const nextSequence = async () => {
    isUserTurn=false;
    userPattern2=[]
    var temp=level;
    setLevel(temp+=1);

    var randomNumber=Math.floor(Math.random() * 6);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern2.push(randomChosenColour);
    buttonPressed(randomChosenColour);
    isUserTurn=true;
  }

  const checkAnswer = (counter) => {
    if(gamePattern2[counter] === userPattern2[counter]){
      if (userPattern2.length === gamePattern2.length){
            setTimeout(()=>{nextSequence();},800)
            

      }
    }else{
      setLevel(0);
      setIsWrong(true);
      var wrongSounds=new Audio(wrongSound);
      wrongSounds.play();
      if(level>highestLevel){
        setHighestLevel(level);
      }
      userPattern2=[];
      gamePattern2=[];
      setStartStop("start");
      setIsStarted(false);
    }
  }

  const buttonPressed = (color) => {
      switch (color) {
        case "green":
          setGreenPressed(true);
          setTimeout(() => setGreenPressed(false), 200);
          var greenbuttonSound=new Audio(greenSound);
          greenbuttonSound.play();
          break;
        case "red":
          setRedPressed(true);
          setTimeout(() => setRedPressed(false), 200);
          var redbuttonSound=new Audio(redSound);
          redbuttonSound.play();
          break;
        case "blue":
          setBluePressed(true);
          setTimeout(() => setBluePressed(false), 200);
          var bluebuttonSound=new Audio(blueSound);
          bluebuttonSound.play();
          break;
        case "purple":
          setPurplePressed(true);
          setTimeout(() => setPurplePressed(false), 200);
          var purplebuttonSound=new Audio(purpleSound);
          purplebuttonSound.play();
          break;
        case "white":
          setWhitePressed(true);
          setTimeout(() => setWhitePressed(false), 200);
          var whitebuttonSound=new Audio(whiteSound);
          whitebuttonSound.play();
          break;
        case "yellow":
          setYellowPressed(true);
          setTimeout(() => setYellowPressed(false), 200);
          var yellowbuttonSound=new Audio(yellowSound);
          yellowbuttonSound.play();
          break;
        default:
          break;
      }
      
      if(isUserTurn){
        userPattern2.push(color);
        checkAnswer(userPattern2.length-1);
      }
      
  }

  return (
    <div className={isWrong? "App game-over" : "App"}>
      <svg id="animatedBg" preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
          <path fill="#9b5de5" className="out-top" d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"/>
          <path fill="#f15bb5" className="in-top" d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"/>
          <path fill="#00bbf9" className="out-bottom" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"/>
          <path fill="#00f5d4" className="in-bottom" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"/>
        </svg>

        <h1 id="level-title">{isStarted? `Level : ${level}` : `Press Start`}</h1>
        <div className="'container">
          <div className="butn-1" onClick={startGame}>{startStop}</div>
        </div>
        
        <div className="container">
          <div className="row">

            <div type="button" onClick={()=>{buttonPressed('green')}} id="green" className={greenPressed ? 'btn green pressed': 'btn green'}>

            </div>

            <div type="button" onClick={()=>{buttonPressed('red')}} id="red" className={redPressed ? 'btn red pressed': 'btn red'}>

            </div>

            <div type="button" onClick={()=>{buttonPressed('white')}} id="white" className={whitePressed ? 'btn white pressed': 'btn white'}>

            </div>
          </div>

          <div className="row">

            <div type="button" onClick={()=>{buttonPressed('yellow')}} id="yellow" className={yellowPressed ? 'btn yellow pressed': 'btn yellow'}>

            </div>
            
            <div type="button" onClick={()=>{buttonPressed('blue')}} id="blue" className={bluePressed ? 'btn blue pressed': 'btn blue'}>

            </div>

            <div type="button" onClick={()=>{buttonPressed('purple')}} id="purple" className={purplePressed ? 'btn purple pressed': 'btn purple'}>

            </div>

          </div>

        </div>
        <h2 id="level-record">Your Highest Level : {highestLevel} </h2>
        <Leaderboard data={leaderboardData} function={chooseUser} logoutFunction={setHighestLevel}/>
        
    </div>
  );
}



export default App;

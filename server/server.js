require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');

// const isLoggedIn= function(req,res,next){
//   req.isAuthenticated() ? next() : res.redirect('/loginResponse')
// }

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: true}));

// mongoose.set('debug', true);
mongoose.connect(process.env.REACT_APP_MONGO_DB)
const userSchema = new mongoose.Schema({
  username:   String,
  email: String,
  password : String,
  googleId:String,
  highestLevel:{type:Number,default:0}
})

userSchema.plugin(findOrCreate);

const User = mongoose.model("User",userSchema);

app.get("/leaderboard", async (req,res)=>{
    const top3 = await User.find({}).sort({highestLevel:-1}).limit(3);
    // console.log(top3);
    res.json(top3);
})
app.post("/leaderboard", async (req,res)=>{
  // console.log(req.body);
  const userNow = await User.findOrCreate(req.body);
  // console.log(userNow);
  res.json(userNow.doc.highestLevel);
})
app.patch("/leaderboard/:username", async (req,res)=>{
  await User.findOneAndUpdate({username:req.params.username , email : req.body.email}, {highestLevel:req.body.highestLevel})
  res.status(200);
})

app.listen(4000, function() {
  console.log("Server started on port 4000");
});

const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const {HoldingsModel}=require('./models/HoldingsModel');
const {PositionsModel} =require('./models/PositionsModel');
const bodyParser=require("body-parser");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const {Signup} =require("./Signup");
const {Login}=require('./Login');


const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser()) 



mongoose.connect(uri).then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));
app.listen(PORT, () => {
  console.log("started");
});

app.get('/allHoldings',async (req,res)=>{
    let allHoldings=await HoldingsModel.find({});
    res.json(allHoldings);
})
app.get('/allPositions',async (req,res)=>{
    let allHoldings=await PositionsModel.find({});
    res.json(allHoldings);
})


app.post("/signup", Signup);


app.post("/login", Login);



app.get("/login")



//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

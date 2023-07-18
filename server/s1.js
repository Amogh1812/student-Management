const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors(
  
));
app.use(express.json());

const url = "mongodb+srv://amoghp44:tmkc696969@cluster0.ndxd9bj.mongodb.net/?retryWrites=true&w=majority"; // Replace with the correct MongoDB server URL
const dbName = "smsapp"; // Replace with the correct database name

app.get("/", (req,res)=>{
    res.send("Hello from the other side")
})
app.post("/create", (req, res) => {
  const data = {
    name: req.body.name,
    rno: req.body.rno,
    marks: req.body.marks,
  };
//console.log(data);
  if (!data.name || !data.rno || !data.marks) {
    return res.status(400).send("Incomplete data provided");
  }

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error connecting to the database");
    }

    const db = client.db(dbName);

    db.collection("Student").findOne({ rno: data.rno }, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error querying the database");
      }

      if (result) {
        console.log("Data already exists");
        return res.status(409).send("Data already exists");
      } else {
        db.collection("Student").insertOne(data, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error inserting data into the database");
          } else {
            console.log("Data added");
            return res.status(201).send("Data added");
          }
        });
      }
    });
  });
});
app.get("/read",(req,res)=>{
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error connecting to the database");
    }

    const db = client.db(dbName);

    db.collection("Student").find({}).toArray((err,result)=>{
      if (err) {
        res.send(err);
      }
      else{
        res.send(result);
      }
    })
  });
  
})
app.delete("/remove",(req,res)=>{
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error connecting to the database");
    }

    const db = client.db(dbName);
    const data={"rno":req.body.rno};

    db.collection("Student").deleteOne(data,(err,result)=>{
      if (err) {
        res.send(err);
      }
      else{
        res.send(result);
      }
    })
  });
  
})
app.put("/change",(req,res)=>{
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error connecting to the database");
    }

    const db = client.db(dbName);
    const data={"name":req.body.name, "marks":req.body.marks};

    db.collection("Student").updateOne({"rno":req.body.rno},{$set:data},(err,result)=>{
      if (err) {
        res.send(err);
      }
      else{
        res.send(result);
      }
    })
  });
  
})
const port = 9999; // Replace with the desired port number

app.listen(port, () => {
  console.log(`Server ready @${port}`);
});

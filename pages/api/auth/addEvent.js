import { MongoClient } from "mongodb";
async function addEventDB(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const email = req.body.email;
    const dateTime = req.body.dateTime;
    const start = req.body.start;
    const end = req.body.end;
    const details = req.body.details;
    //Connect with database
    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const status = await db.collection("events").insertOne({
      email: email,
      dateTime: dateTime,
      start: start,
      end: end,
      details: details,
    });
    //Send success response
    res.status(201).json({ message: "Event added", ...status });
    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
export default addEventDB;

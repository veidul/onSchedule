import { MongoClient } from "mongodb";
async function eventState(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const data = [];
    const email = req.body;
    //Connect with database
    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const cursor = await db.collection("events").find({ email: email });
    await cursor.forEach((doc) => data.push(doc));
    // console.log({ ...status }, "status");
    //Send success response
    res.status(201).json(data);
    //Close DB connection
    client.close();
    return data;
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
export default eventState;

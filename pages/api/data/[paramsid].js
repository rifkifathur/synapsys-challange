// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {

  const client = await MongoClient.connect('mongodb://127.0.0.1:27017/data');
  const db = client.db();
  const dbCollecting = db.collection('data');
  const { paramsid } = req.query;
  const query = { _id: ObjectId(paramsid) }

  if (req.method === "GET") {
    const results = await dbCollecting.findOne(query);
    client.close();
    res.status(200).json(results);
  }

  else if (req.method === "PUT") {
    const data = req.body
    
    // const queryId = { _id: ObjectId(data._id) }
    const updateField = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      address: data.address
    }
    
    const results = await dbCollecting.updateOne(query, {
      $set: updateField
    });
    client.close();

    res.status(200).json(results)
   
  }

  else if (req.method === "DELETE") {
    const results = await dbCollecting.deleteOne(query);
    client.close();
    res.status(200).json(results);
  }
}

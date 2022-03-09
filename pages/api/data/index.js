// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
export default async function handler(req, res) {

  const client = await MongoClient.connect('mongodb://127.0.0.1:27017/data');
  const db = client.db();
  const dbCollecting = db.collection('data');
 
  

  if(req.method === 'GET'){
    const results = await dbCollecting.find().toArray();
    client.close();
    res.status(200).json(results);

  }

  else if( req.method === 'POST'){
    const data = req.body;

    const results = await dbCollecting.insertOne(data);

    client.close();

    res.status(201).json({message: "got it"})

  }
  
}

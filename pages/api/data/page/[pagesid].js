// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {

  const client = await MongoClient.connect('mongodb://127.0.0.1:27017/data');
  const db = client.db();
  const dbCollecting = db.collection('data');
  const { pagesid } = req.query;
  // const query = { _id: ObjectId(paramsid) }

  if (req.method === "GET") {
    const results = await dbCollecting.find().toArray();
    client.close();

    const allPostsData = results
    const perPage = 9
    const totalPosts = allPostsData.length
    const totalPages = totalPosts / perPage
    const start = (pagesid - 1) * perPage
    let end = start + perPage
    if (end > totalPosts) {
        end = totalPosts
    }

    res.status(200).json({
      currentPage: pagesid,
      perPage: perPage,
      totalCount: totalPosts,
      pageCount: totalPages,
      start: start,
      end: end,
      posts: allPostsData.slice(start, end)
    });
  }
  else if (req.method === "DELETE") {
    const results = await dbCollecting.deleteOne(pagesid);
    client.close();
    res.status(200).json(results);
  }

}

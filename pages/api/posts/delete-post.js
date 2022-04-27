import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return;
    }
    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: "Not auuthorizated" });
    }
    const { author, post } = req.body;
    const client = await connectToDatabase();

    const db = client.db();

    const findPost = await db.collection("posts").findOne({ _id: new ObjectId(post) });

    const deletePost =
        findPost.author === author && (await db.collection("posts").deleteOne({ _id: new ObjectId(post) }));

    if (!deletePost && !findPost) {
        res.send({ message: "Error" });
    }
    res.send({ message: deletePost });
}

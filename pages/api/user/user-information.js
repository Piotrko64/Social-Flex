import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }

    const { user } = req.body;

    const client = await connectToDatabase();

    const db = client.db();
    const existUser = await db.collection("users").findOne({ name: user });

    const posts = await db.collection("posts").find({ type: "POST" }).toArray();

    res.send({ user: existUser, posts: posts.reverse() });
    client.close();
}

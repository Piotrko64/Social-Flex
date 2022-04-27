import { connectToDatabase } from "../../../lib/db";
import { getSession } from "next-auth/client";
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }
    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: "Not auuthorizated" });
    }
    const { author, text, image } = req.body;
    const client = await connectToDatabase();

    const db = client.db();

    const insertPost = await db.collection("posts").insertOne({ type: "POST", author, text, image });
    if (!insertPost) {
        res.send({ message: "Error" });
    }
    res.send({ message: "Everything is ok!" });
}

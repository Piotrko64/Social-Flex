import { connectToDatabase } from "../../../lib/db";
import { storage } from "../../../lib/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default async function handler(req, res) {
    const { user, image } = req.body;
    const client = await connectToDatabase();

    const db = client.db();

    listAll(ref(storage, "/images")).then((res) => {
        res.items.forEach((item) => {
            getDownloadURL(item)
                .then(async (url) => {
                    if (item._location.path_ == image) {
                        const updateImageAdressUser = await db
                            .collection("users")
                            .updateOne({ name: user }, { $set: { image: url } });
                        const updatePosts = await db
                            .collection("posts")
                            .updateMany({ author: user }, { $set: { image: url } });
                    }
                })
                .catch((res) => res.status(500).send("ERROR"));
        });
    });
    res.status(200).send({
        message: "Everything is ok!",
    });
}

import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const result = await MongoClient.connect(process.env.mongodbConnect);
    return result;
}
